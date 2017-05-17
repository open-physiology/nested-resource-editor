import {lyphs, relations, edges, trees} from './apinatomyData.json';
import fmaData from './fmaNames.txt';
import isArray from 'lodash-bound/isArray';

const toNumberRange = (source, transform) => {
    if (source.length === 0) { return {value: 0, class: "Number"}; }
    let range = [...source.match( /\d+/g )];
    if (transform) { range = range.map(x => transform(x)); }
    if (range.length === 0){ return {value: 0, class: "Number"}; }
    if (range.length === 1){ return {value: range[0], class: "Number"}; }
    if (range[1] < range[0]) {
        return {min: range[1], max: range[0], class: "NumberRange"};
    }
    return {min: range[0], max: range[1], class: "NumberRange"};
};

/** Create ApiNatomy data
 * @param {Object} model - the open physiology model
 */
export function loadData(model){
    let fmaNames = {};
    fmaData.split('\n').map(line => {
        let endOfURI = line.indexOf(" ");
        let uri  = line.substring(0, endOfURI).trim();
        let name = line.substring(endOfURI + 1).trim();
        fmaNames[uri] = name;
    });

    ////////////////////////////////////////////////////
    /*Lyphs*/
    ////////////////////////////////////////////////////
    let lyphMap = {};
    /*External resources*/
    let fmaMap  = {};

    //We exclude lyphs with 'tree' in the name as they are CanonicalTrees
    for (let lyph of lyphs){
        //name => name
        let jsonDef = {name: lyph.name};
        let options = {};
        let cls = lyph.name.endsWith("tree")? model.CanonicalTree: model.Lyph;

        //type => borders or class
        switch (lyph.type){
            case "BAG"      : jsonDef.radialBorders = [
                model.Border.new({nature: ["closed"]}),
                model.Border.new({nature: ["closed"]}),
            ] ; break;
            case "CYST"     : jsonDef.radialBorders = [
                model.Border.new({nature: ["open"]}),
                model.Border.new({nature: ["closed"]}),
            ] ; break;
            case "TUBE"     : jsonDef.radialBorders = [
                model.Border.new({nature: ["open"]}),
                model.Border.new({nature: ["open"]}),
            ] ; break;
            //Geometric -> with axis
            case "GEOMETRIC": options.createAxis = true; break;
            //Create material instead of lyph ?
            case "MATERIAL" : cls = model.Material; break;
            case "COALESCENCE GROUP": break; //skip
        }

        //thickness & length
        jsonDef.thickness = toNumberRange(lyph.thickness, x => 10 ** (-x));
        jsonDef.length    = toNumberRange(lyph.lgth, x => 10 ** (-x));

        //ontoref => external resources
        if (lyph.ontoref) {
            jsonDef.externals = [];
            let refs = lyph.ontoref::isArray()? lyph.ontoref: [lyph.ontoref];
            for (let ref of refs.filter(x => x.length > 0)){
                if (!fmaMap[ref]) {
                    let fmaID = `http://purl.obolibrary.org/obo/${ref.replace(/\s/g, '').replace(':', '_')}`;
                    fmaMap[ref] = model.ExternalResource.new({
                        name: fmaNames[fmaID]? fmaNames[fmaID]: "",
                        type: "fma",
                        uri: fmaID
                    });
                }
                jsonDef.externals.push(fmaMap[ref]);
            }
        }

        //Create resources
        lyphMap[lyph.ID] = cls.new(jsonDef);
        //Canonical tree is not a lyph, type (BAG | CYST | TUBE), length, and thickness are ignored
    }

    ///////////////////////////////////////////////////////////
    /*Relations*/
    ///////////////////////////////////////////////////////////
    let typeMap = {};
    const getType = (id, template) => {
        if (!typeMap[id]){
            typeMap[id] = model.Type.new({name: template.name, definition: template});
        }
        return typeMap[id];
    };

    for (let rel of relations){
        let jsonDef = {};
        switch (rel.relation){
            case "is_layer_of_in_position":
                jsonDef = {class: model.HasLayer.name}; break;
            case "is_housed_in":
                jsonDef = {class: model.HasPart.name}; break;
            case "has_material_type":
                jsonDef = {class: model.ContainsMaterial.name}; break;
            case "sub_type_of":
                jsonDef = {class: model.IsSubtypeOf.name}; break;
            default: console.log("Unexpected relationship class", rel.relation);
        }

        //publicationIDs - not used
        let lyph1 = lyphMap[rel.object];
        let lyph2 = lyphMap[rel.subject];
        if (!lyph1 || !lyph2){
            console.log("Error: relationship ends not found!");
        } else {
            if (jsonDef.class){
                switch (jsonDef.class){
                    case model.IsSubtypeOf.name:
                        jsonDef[1] = getType(rel.object, lyph1);
                        jsonDef[2] = getType(rel.subject, lyph2);
                        break;
                    case model.ContainsMaterial.name:
                        jsonDef[1] = lyph1;
                        jsonDef[2] = getType(rel.subject, lyph2);
                        break;
                    default:
                        jsonDef[1] = lyph1;
                        jsonDef[2] = lyph2;
                }

                //TODO Delete for the new version of model library
                model[jsonDef.class].new(jsonDef);

                //All our relationships have multiple cardinality
                // if (!jsonDef[1][`-->${jsonDef.class}`]){
                //     jsonDef[1][`-->${jsonDef.class}`] = [];
                // }
                // jsonDef[1][`-->${jsonDef.class}`].push(jsonDef[2]);
            }
        }
    }

    //Order layers according to relativePosition (rel.extra)
    for (let [id, lyph] of Object.entries(lyphMap)){
        let layers = relations.filter(rel =>
            (rel.object == id) && (rel.relation === "is_layer_of_in_position"))
            .sort((a,b) => (a.extra > b.extra));
        for (let i = 1; i< layers.length; i++){
            let jsonDef = {class: model.IsRadiallyAdjacent.name};
            jsonDef[1] = lyphMap[layers[i].subject];
            jsonDef[2] = lyphMap[layers[i - 1].subject];
            //IsRadiallyAdjascent is a resource and can be created via model library
            model[jsonDef.class].new(jsonDef);
        }
    }


    ///////////////////////////////////////////////////
    /*Canonical trees*/
    ///////////////////////////////////////////////////
    let treeMap = {};
    for (let [key, def] of Object.entries(lyphMap)){
        if (def.name.endsWith("tree")){ treeMap[key] = def; }
    }

    for (let [id, host] of Object.entries(treeMap)){
        //in_lyph is number and id is a string
        let branches = trees.filter(x => x.in_lyph == id).sort((a, b) => a.level > b.level);
        let parents = {};
        parents[0] = host;
        //Create tree branches and nodes
        for (let branch of branches){
            //name
            let jsonDef = {"name": `${host.name} branch ${branch.level}` };

            //conveying lyph
            if (!lyphMap[branch.lyph]){
                console.log("Unrecognized conveying lyph", branch.lyph);
            } else {
                jsonDef.conveyingLyphType = getType(branch.lyph, lyphMap[branch.lyph])
            }

            //parent tree
            jsonDef.parentTree = parents[branch.level - 1];

            //branching factor
            jsonDef.cardinalityBase = toNumberRange(branch.branch_factor);

            //length and thickness of branch - skip for now

            //Create canonical tree branch and leaf node
            let ctBranch = model.CanonicalTreeBranch.new(jsonDef);

            //create a tree node after branch
            let cTree = model.CanonicalTree.new({
                "name": `${host.name} ${branch.level}`, parentBranch: ctBranch
            });
            parents[branch.level] = cTree;
        }
    }

    ///////////////////////////////////////////////////
    /*Process edges*/
    ///////////////////////////////////////////////////
    //Edge entry {"ID": 1,"lyph_node1": 197,"lyph_node2": 199,"label": "Spinocerebellar tract"}
    let lyphNodeMap = {};
    const getNode = (id, jsonDef) => {
        if (!lyphNodeMap[id]){
            lyphNodeMap[id] = model.Node.new(jsonDef);
        }
        return lyphNodeMap[id];
    };

    for (let edge of edges){
        if (!lyphMap[edge.lyph_node1] || !lyphMap[edge.lyph_node2]){
            console.log("Unknown locations for the edge", edge.ID);
        } else {
            let node1 = getNode(edge.lyph_node1, {name: `${lyphMap[edge.lyph_node1].name} node`, locations: [lyphMap[edge.lyph_node1]]});
            let node2 = getNode(edge.lyph_node2, {name: `${lyphMap[edge.lyph_node2].name} node`, locations: [lyphMap[edge.lyph_node2]]});
            model.Process.new({name: edge.label, source: node1, target: node2});
        }
    }

}