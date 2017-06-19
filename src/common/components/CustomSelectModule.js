import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeTransformModule} from '../PipeTransformModule';
import {DropdownModule} from 'ngx-dropdown';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'angular2-select';
import isSet from 'lodash-bound/isSet';

@Component({
    selector: 'select-input',
    template: `
        <ng-select 
                [options]    = "options | setToArray | mapToOptions"
                [(ngModel)]  = "_items"
                [placeholder]= "placeholder"
                [disabled]   = "disabled"
                [multiple]   = "multiple"
                [allowClear] = "true"
                (selected)   = "_addValue($event)"
                (deselected) = "_deleteValue($event)"
          >
        ></ng-select>
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
 * A component for single and multiple selection in drop-down list
 */
export class CustomSelectInput {
    /**
     * The set of input items
     * @type {Set<Object>}
     */
    @Input()  items   = new Set();

    /**
     * The set of items for selection
     * @type {Set<Object>}
     */
    @Input()  options = new Set();

    /**
     * The boolean flag to disable the component
     * @type {boolean}
     */
    @Input()  disabled = false;

    /**
     * The placeholder to show in the selection field
     * @type {string}
     */
    @Input() placeholder = "Select";

    /**
     * A flag indicating whether multiple selection is allowed
     * @type {boolean}
     */
    @Input() multiple = true;

    /**
     * The event to signal that the selected item has been changed
     * @type {EventEmitter}
     */
    @Output() updated = new EventEmitter();

    _items = [];

    /**
     * Update component parameters in response to external data change
     * @param {Object} changes - the object defining input data changes
     */
    ngOnChanges(changes) {
            if (!this.items){
                this._items = [];
            } else {
                let tmp = this.items;
                if (!this.items::isSet()) { tmp = new Set().add(this.items); }
                this._items = Array.from(tmp);
            }
    }

    _addValue(item){
        if (!this.items || !this.items::isSet()){
            this.items = item.value;
        } else {
            if (!this.multiple){ this.items.clear(); }
            this.items.add(item.value);
        }
        this.updated.emit(this.items);
    }

    _deleteValue(item){
        if (!this.items || !this.items::isSet()){
            this.items = null;
        } else {
            if (!this.multiple){
                this.items.clear();
            } else {
                this.items.delete(item.value);
            }
        }
        this.updated.emit(this.items);
    }
}

/**
 * The CustomSelectModule module, offers a pre-configured multiple and single item selection component.
 */
@NgModule({
    imports: [ CommonModule, FormsModule, DropdownModule, PipeTransformModule, SelectModule ],
    declarations: [ CustomSelectInput ],
    exports: [ CustomSelectInput ]
})
export class CustomSelectModule {}




