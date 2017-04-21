/**
 * Created by Natallia on 4/14/2017.
 */
import {NgModule, Pipe, PipeTransform} from '@angular/core';

///////////////////////////////////////////////////
@Pipe({name: 'hideClass'})
export class HideClass implements PipeTransform {
    transform(items: any, classNames: Array<any> = []): Array<any> {
        return items.filter(x => !classNames.includes(x.class));
    }
}

@Pipe({name: 'filterBy'})
export class FilterBy implements PipeTransform {
    transform(items: Array<any> = [], [searchString, propName]): Array<any> {
        return items.filter(item => (typeof(item[propName]) === 'string')
            ? item[propName].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            : item[propName] === searchString);
    }
}

@Pipe({name: 'setToArray'})
export class SetToArray implements PipeTransform {
    transform(items: Set<any>): Array<any> {
        return Array.from(items || []);
    }
}

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
    transform(items: Array<any>, sortMode: string): Array<any> {
        let propName = (sortMode[0] === '-')? sortMode.substring(1): sortMode;
        if (propName === "unsorted") {
            return items;
        } else {
            return items.sort((a: any, b: any) => {
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

@NgModule({
    declarations: [ OrderBy, FilterBy, SetToArray, HideClass ],
    exports: [ OrderBy, FilterBy, SetToArray, HideClass ]
})
export class PipeTransformModule {}


