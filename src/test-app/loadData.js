import {lyphs, relations, edges, trees} from './apinatomyData.json';
//import fmaData from './fmaNames.txt';
import isArray from 'lodash-bound/isArray';

const toNumberRange = (source, transform) => {
    if (source.length === 0) { return {value: 0, class: "Number"}; }
    let range = [...source.match( /\d+/g )];
    if (transform) { range = range.map(x => transform(x)); }
    if (range.length === 0){ return {value: 0, class: "Number"}; }
    if (range.length === 1){ return {value: range[0], class: "Number"}; }
    return {min: range[1], max: range[0], class: "NumberRange"};
};


/** Create ApiNatomy data
 * @param {Object} model - the open physiology model
 */
export function loadData(model){
    // let fmaNames = {};
    // fmaData.split('\n').map(line => {
    //     let endOfURI = line.indexOf(" ");
    //     let uri  = line.substring(0, endOfURI).trim();
    //     let name = line.substring(endOfURI + 1).trim();
    //     fmaNames[uri] = name;
    // });

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
        // if (lyph.ontoref) {
        //     jsonDef.externals = [];
        //     let refs = lyph.ontoref::isArray()? lyph.ontoref: [lyph.ontoref];
        //     for (let ref of refs.filter(x => x.length > 0)){
        //         if (!fmaMap[ref]) {
        //             let fmaID = `http://purl.obolibrary.org/obo/${ref.replace(/\s/g, '').replace(':', '_')}`;
        //             fmaMap[ref] = model.ExternalResource.new({
        //                 name: fmaNames[fmaID]? fmaNames[fmaID]: "",
        //                 type: "fma",
        //                 uri: fmaID
        //             });
        //         }
        //         jsonDef.externals.push(fmaMap[ref]);
        //     }
        // }

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
        		jsonDef = {class: model.HasLayer.name, relativePosition: rel.extra}; break;
        	case "is_housed_in":
        		jsonDef = {class: model.HasPart.name}; break;
        	case "has_material_type":
        	    jsonDef = {class: model.ContainsMaterial.name}; break;
            case "sub_type_of":
                jsonDef = {class: model.IsSubtypeOf.name}; break;
            default: console.log("Unexpected relationship class", rel.relation);
        }

        //publicationIDs - not used
        let lyph1 = lyphMap[rel.subject];
        let lyph2 = lyphMap[rel.object];
        if (!lyph1 || !lyph2){
            console.log("Error: relationship ends not found!");
        } else {
            if (jsonDef.class){
                //TODO Delete for the new version of model library
                switch (jsonDef.class){
                    case model.IsSubtypeOf.name:
                        jsonDef[1] = getType(rel.subject, lyph1);
                        jsonDef[2] = getType(rel.object, lyph2);
                        break;
                    case model.ContainsMaterial.name:
                        jsonDef[1] = lyph1;
                        jsonDef[2] = getType(rel.object, lyph2);
                        break;
                    default:
                        jsonDef[1] = lyph1;
                        jsonDef[2] = lyph2;
                }
                model[jsonDef.class].new(jsonDef);

                //TODO Uncomment for the new version of model library
                // if (!lyphMap[rel.subject][`-->${jsonDef.class}`]){
                //     lyphMap[rel.subject][`-->${jsonDef.class}`] = [];
                // }
                // lyphMap[rel.subject][`-->${jsonDef.class}`].push(lyphMap[rel.object]);
            }
        }
    }

    ///////////////////////////////////////////////////
    /*Canonical trees*/
    ///////////////////////////////////////////////////
    let treeMap = {};
    for (let [key, def] of Object.entries(lyphMap)){
        if (def.name.endsWith("tree")){
            treeMap[key] = def;
        }
    }

    console.log("CREATING TREES", treeMap);

    for (let [id, host] of Object.entries(treeMap)){
        console.log("Processing", id, host);
        //TODO fix this - branches array is always empty...
        let branches = trees.filter(x => x.in_lyph === id).sort((a, b) => a.level < b.level);
        console.log("Branches", branches);
        let parents = {0: host};
        //Create tree branches and nodes
        for (let branch of branches){
            //name
            let jsonDef = {"name": `Branch ${branch.level} for ${host.name}` };
            //conveying lyph
            if (!lyphMap[branch.lyph]){
                console.log("Unrecognized conveying lyph", branch.lyph);
            } else {
                jsonDef.conveyingLyph = getType(branch.lyph, lyphMap[branch.lyph]);
            }
            //parent tree
            jsonDef.parentTree = parents[branch.level - 1];
            //branching factor
            if (branch.branch_factor.length > 0){
                let thickness = [...lyph.thickness.match( /\d+/g )].map(x => 10 ** (-x));
                jsonDef.thickness = {min: thickness[1], max: thickness[0]};
            }

            jsonDef.cardinalityMultipliers = toNumberRange(branch.branch_factor);
            //length and thickness of branch - skip for now

            //Create canonical tree branch and leaf node
            let ctBranch = model.CanonicalTreeBranch.new(jsonDef);
            //create node after branch
            let cTree = model.CanonicalTree.new({
                "name": `${host.name} ${branch.level}`,
                parentBranch: ctBranch
            });
            parents[branch.level] = cTree;
        }
    }

}