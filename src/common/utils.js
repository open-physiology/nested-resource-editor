"use strict";

import '../libs/rxjs';
import $ from '../libs/jquery';

import modelFactory, {ajaxBackend} from 'open-physiology-model';

let {backend} = ajaxBackend({
    baseURL:     'http://open-physiology.org:8880',
    ajax:        $.ajax
});

export const modelRef = modelFactory(backend);
export const model = modelRef.classes;
window.module = modelRef;

export const modelClassNames = {};

for (let cls of Object.values(model)){
    if (cls.isResource && !cls.abstract){
        modelClassNames[cls.name] = cls.name;
        if (cls.name === model.Lyph.name){
            modelClassNames["LyphWithAxis"] = "LyphWithAxis";
        }
    }
}

///////////////////////////////////////////////////
//Helpers
//////////////////////////////////////////////////
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}

export const getColor = (str) => intToRGB(hashCode(str));

export function getPropertyLabel(option: string): string{
    let custom = {
        "externals": "Annotations",
        "locals": "Local resources"
    };
    if (custom[option]) return custom[option];

    if (["id", "uri"].includes(option)) return option.toUpperCase();

    let label = option.replace(/([a-z])([A-Z])/g, '$1 $2');
    label = label[0].toUpperCase() + label.substring(1).toLowerCase();
    return label;
}

export function getClassLabel(option: string): string{
    if (!option) return "";
    let label = option;
    label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
    label = label[0].toUpperCase() + label.substring(1).toLowerCase();
    return label;
}

export function getResourceIcon(item): string{
    if (!item) { return ""; }
    if (item.class === model.Lyph.name && item.axis) { return "src/images/lyphWithAxis.png"; }
    let clsName = item.class;
    if (item.class === model.Type.name){
        clsName = (item['<--DefinesType'] && item['<--DefinesType'][1])? item['<--DefinesType'][1].class: "Resource";
    }
    return model[clsName].icon;
}






