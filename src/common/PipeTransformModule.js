import {NgModule, Pipe, PipeTransform} from '@angular/core';
import isString from 'lodash-bound/isString';
import isUndefined from 'lodash-bound/isUndefined'

@Pipe({name: 'hideClass'})
/**
 * The HideClass pipe, hides resources of given classes.
 */
export class HideClass implements PipeTransform {
    /**
     * @param {Array<Resource>} items - the array of resources to filter
     * @param {Array<string>} classNames - the array of resource classes to hide
     *
     * @returns {Array<Resource>} - the array of filtered resources
     */
    transform(items, classNames = []) {
        return items.filter(x => !classNames.includes(x.class));
    }
}

/**
 * The FilterBy pipe, filters resources to select those that contain a given string in a given field.
 */
@Pipe({name: 'filterBy'})
export class FilterBy implements PipeTransform {
    /**
     * @param {Array<Resource>} items - the array of resources to filter
     * @param {string} searchString - the string that the resource field must contain
     * @param {string} propName - the resource field name
     * @returns {Array<Resource>} - the array of filtered resources
     */
    transform(items = [], [searchString, propName]) {
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
    /**
     * @param {Set} items - the set of items
     * @returns {Array} - the array of items
     */
    transform(items) { return Array.from(items || {}).filter(x => !x::isUndefined()); }
}

/**
 * The OrderBy pipe, sorts given array according to the given sort mode
 */
@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
    /**
     *
     * @param {Array} items - the array of items to sort
     * @param {string} sortMode - the sort mode, the property of the item used for sorting
     *  with optional "-" prefix to sort in the descending order.
     * @returns {Array} - the sorted array. If sortedMode equals "unsorted", the function returns the input array without changes.
     */
    transform(items, sortMode) {
        let propName = (sortMode[0] === '-')? sortMode.substring(1): sortMode;
        if (propName === "unsorted") {
            return items;
        } else {
            if (!items || (items.length === 0)) {return items;}
            if (items[0]::isString()){
                return items.sort((a, b) => {
                    if ((sortMode[0] === '-')) {//desc
                        return (a > b) ? -1 : ((a < b) ? 1 : 0);
                    } else {//asc
                        return (a > b) ? 1 : ((a < b) ? -1 : 0);
                    }
                });
            }
            return items.sort((a, b) => {
                if ((sortMode[0] === '-')) {//desc
                    return (a[propName] > b[propName])? -1: ((a[propName] < b[propName])? 1: 0);
                } else {//asc
                    return (a[propName] > b[propName])? 1: ((a[propName] < b[propName])? -1: 0);
                }
            });
        }
    }
}

/**
 * The MapToOptions pipe, maps resources into objects for drop-down lists
 */
@Pipe({name: 'mapToOptions'})
export class MapToOptions implements PipeTransform {
    /**
     * @param {Array<Resource>} items -  the array of resources to convert to the array of selection options
     * which are objects with fields "id" and "text".
     * @returns {Array<{value: string, label: string}>} - the array of drop-down list selection options
     */
    transform(items = []) {
        return items.map(x =>({value: x, label: x.name? x.name: "(Unnamed) " + x.class}))
    }
}


/**
 * The PipeTransformModule module, exports open-physiology helper pipes
 */
@NgModule({
    declarations: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions],
    exports: [ OrderBy, FilterBy, SetToArray, HideClass, MapToOptions]
})
export class PipeTransformModule {}


