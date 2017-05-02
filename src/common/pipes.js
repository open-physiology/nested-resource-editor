import {NgModule, Pipe, PipeTransform} from '@angular/core';

///////////////////////////////////////////////////
@Pipe({name: 'hideClass'})
export class HideClass implements PipeTransform {
    transform(items, classNames: Array<any> = []): Array<any> {
        return items.filter(x => !classNames.includes(x.class));
    }
}

@Pipe({name: 'filterBy'})
export class FilterBy implements PipeTransform {
    transform(items: Array<any> = [], [searchString, propName]): Array<any> {
        if (searchString.length === 0) { return items; }
        return items.filter(item => (typeof(item[propName]) === 'string')
            ? item[propName].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            : item[propName] === searchString);
    }
}

@Pipe({name: 'setToArray'})
export class SetToArray implements PipeTransform {
    transform(items: Set<any>): Array<any> { return Array.from(items || {}); }
}

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

@Pipe({name: 'mapToOptions'})
class MapToOptions implements PipeTransform {
    transform(items: Array<any> = []) {
        return items.filter(x => (x.name && (x.name !== ""))).map((entry) => ({
            id: entry,
            text: entry.name? entry.name: "(Unnamed) " + entry.class
        }))
    }
}

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

@NgModule({
    declarations: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions, MapToCategories ],
    exports: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions, MapToCategories ]
})
export class PipeTransformModule {}


