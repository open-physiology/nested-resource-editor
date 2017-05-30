import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeTransformModule, SetToArray, MapToOptions} from '../PipeTransformModule';
import {DropdownModule} from 'ngx-dropdown';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'angular2-select';

@Component({
    selector: 'select-input',
    template: `
        <div *ngIf="_active">
            <ng-select 
                    [options]    = "options | setToArray | mapToOptions"
                    [(ngModel)]  = "_items"
                    placeholder  = "Select many"
                    [disabled]   = "disabled"
                    [multiple]   = "true"
                    [allowClear] = "true"
                    (selected)   = "_updateValue($event)"
                    (deselected) = "_updateValue($event)">
            ></ng-select>
        </div>
    `,
    styles: [
        `
            :host > div >>> .below {
                height: 30px;
                border-radius: 4px;
            }
        `
    ]
})
/**
 * A component for multiple selection in drop-down list
 */
export class MultiSelectInput {
    /**
     * The set of input items
     * @type {Set<T>|Set}
     */
    @Input()  items   = new Set();
    /**
     * The set of items for selection
     * @type {Set<T>|Set}
     */
    @Input()  options = new Set();
    /**
     * The boolean flag to disable the component
     * @type {boolean}
     */
    @Input()  disabled = false;
    /**
     * The event to signal that the selected item has been changed
     * @type {EventEmitter}
     */
    @Output() updated = new EventEmitter();

    _active = true;
    _externalChange = false;
    _items = [];

    /**
     * Update component parameters in response to external data change
     * @param changes - the object defining input data changes
     */
    ngOnChanges(changes) {
        if (this._externalChange){
            setTimeout(() => { this._active = false }, 0);
            setTimeout(() => { this._active = true  }, 0);
            this._items =  new MapToOptions().transform(new SetToArray().transform(this.items || {}));
        }
        this._externalChange = true;
    }

    /**
     * @param item - added or removed item
     * @private
     */
    _updateValue(item){
        this._externalChange = false;
        this.items = this._items;
        this.updated.emit(this.items);
    }
}

@Component({
    selector: 'select-input-1',
    template:`
        <div *ngIf="_active">
            <ng-select
                    [options]    = "options | setToArray | mapToOptions"
                    [(ngModel)]  = "_items"
                    placeholder  = "Select one"
                    [disabled]   = "disabled"
                    [multiple]   = false
                    [allowClear] = true
                    (selected)   = "_updateValue($event)"
                    (deselected) = "_updateValue($event)">
            ></ng-select>
        </div>
    `,
    styles: [
        `
        :host > div >>> .below {  
            height: 30px;
            border-radius: 4px;
        }
        `
    ]
})
/**
 * A component for a single item selection in drop-down list
 */
export class SingleSelectInput {
    /**
     * The set of input items
     * @type {Set<T>|Set}
     */
    @Input()  item  = new Set();
    /**
     * The set of items for selection
     * @type {Set<T>|Set}
     */
    @Input()  options = new Set();
    /**
     * The boolean flag to disable the component
     * @type {boolean}
     */
    @Input()  disabled = false;
    /**
     * The event to signal that the selected item has been changed
     * @type {EventEmitter}
     */
    @Output() updated = new EventEmitter();

    _active = true;
    _externalChange = false;
    _items = [];

    /**
     * Update component parameters in response to external data change
     * @param {Object} changes - the object defining input data changes
     */
    ngOnChanges(changes) {
        if (this._externalChange){
            setTimeout(() => { this._active = false }, 0);
            setTimeout(() => { this._active = true  }, 0);
            this._items =  new MapToOptions().transform(new SetToArray().transform(this.item));
        }
        this._externalChange = true;
    }

    /**
     * @param item - added or removed item
     * @private
     */
    _updateValue(item){
        this._externalChange = false;
        this.item = this._items;
        this.updated.emit(this.item);
    }
}
/**
 * The CustomSelectModule module, offers pre-configured multiple and single item selection components.
 */
@NgModule({
    imports: [ CommonModule, FormsModule, DropdownModule, PipeTransformModule, SelectModule ],
    declarations: [ MultiSelectInput, SingleSelectInput ],
    exports: [ MultiSelectInput, SingleSelectInput ]
})
export class CustomSelectModule {}




