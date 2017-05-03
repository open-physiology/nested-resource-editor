import {NgModule, Pipe, PipeTransform} from '@angular/core';

/**
 * The HideClass pipe, hides entities of given class.
 */
@Pipe({name: 'hideClass'})
export class HideClass implements PipeTransform {
    transform(items, classNames: Array<any> = []): Array<any> {
        return items.filter(x => !classNames.includes(x.class));
    }
}

/**
 * The FilterBy pipe, filters items to select those that contain a given string in a given field.
 */
@Pipe({name: 'filterBy'})
export class FilterBy implements PipeTransform {
    transform(items: Array<any> = [], [searchString, propName]): Array<any> {
        if (searchString.length === 0) { return items; }
        return items.filter(item => (typeof(item[propName]) === 'string')
            ? item[propName].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            : item[propName] === searchString);
    }
}

/**
 * The SetToArray pipe, converts a given set to an array.
 */
@Pipe({name: 'setToArray'})
export class SetToArray implements PipeTransform {
    transform(items: Set<any>): Array<any> { return Array.from(items || {}); }
}

/**
 * The OrderBy pipe, sorts given list according to the given sort mode
 */
@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
    transform(items: Array<any>, sortMode: string): Array<any> {
        let propName = (sortMode[0] === '-')? sortMode.substring(1): sortMode;
        if (propName === "unsorted") {
            return items;
        } else {
            return items.sort((a, b) => {
                if ((sortMode[0] === '-')) {//desc
                    if (a[propName] > b[propName]) return -1;
                    if (a[propName] < b[propName]) return 1;
                    return 0;
                } else {//asc
                    if (a[propName] > b[propName]) return 1;
                    if (a[propName] < b[propName]) return -1;
                    return 0;
                }
            });
        }

    }
}

/**
 * The MapToOptions pipe, maps entities into objects for drop-down lists
 */
@Pipe({name: 'mapToOptions'})
class MapToOptions implements PipeTransform {
    transform(items: Array<any> = []) {
        return items.filter(x => (x.name && (x.name !== ""))).map((entry) => ({
            id: entry,
            text: entry.name? entry.name: "(Unnamed) " + entry.class
        }))
    }
}

/**
 * The MapToCategories pipe, maps entities into categorized objects for drop-down lists
 */
@Pipe({name: 'mapToCategories'})
class MapToCategories implements PipeTransform {
    transform(items: Array<any> = []) {
        let types = Array.from(new Set(items.map(item => item.type)));
        let typedItems: Array<any> = [];
        for (let type of types){
            let typed = items.filter(item => (item.type === type));
            typedItems.push({text: type, children: typed});
        }
        return typedItems;
    }
}

/**
 * The PipeTransformModule module, exports all open-physiology helper pipes
 */
@NgModule({
    declarations: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions, MapToCategories ],
    exports: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions, MapToCategories ]
})
export class PipeTransformModule {}


