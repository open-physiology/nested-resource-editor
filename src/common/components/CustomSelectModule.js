import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeTransformModule} from '../PipeTransformModule';
import {DropdownModule} from 'ngx-dropdown';
import {SelectModule} from 'ng2-select';

@Component({
    selector: 'select-input',
    template: `
        <div *ngIf="_active">
            <ng-select
                    [items]="options | setToArray | mapToOptions"
                    [active]="items   | setToArray | mapToOptions"
                    [disabled]="disabled"
                    [multiple]="true"
                    [allowClear]="true"
                    (data)="_refreshValue($event)"
            ></ng-select>
        </div>
    `,
    styles: [
        `
        :host >>> .ui-select-container{
            height: 30px;
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

    /**
     * Update component parameters in response to external data change
     * @param changes - the object defining input data changes
     */
    ngOnChanges(changes) {
        if (this._externalChange){
            setTimeout(() => { this._active = false }, 0);
            setTimeout(() => { this._active = true  }, 0);
        }
        this._externalChange = true;
    }

    _refreshValue(value):void {
        this._externalChange = false;
        let newItems = value.map(x => x.id);
        this.updated.emit(new Set(newItems));
    }
}

@Component({
    selector: 'select-input-1',
    template:`
        <div *ngIf="_active">
            <ng-select
                    [items]="options | setToArray | mapToOptions"
                    [active]="[item || {}] | mapToOptions"
                    [disabled]="disabled"
                    [multiple]=false
                    [allowClear]=true
                    (data)="_refreshValue($event)"
            ></ng-select>
        </div>
    `,
    styles: [
        `
        :host >>> .ui-select-container{
            height: 30px;
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
    @Input()  item    = new Set();
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

    /**
     * Update component parameters in response to external data change
     * @param {Object} changes - the object defining input data changes
     */
    ngOnChanges(changes) {
        if (this._externalChange){
            setTimeout(() => {this._active = false}, 0);
            setTimeout(() => {this._active = true},  0);
        }
        this._externalChange = true;
    }

    _refreshValue(value = {}):void {
        this._externalChange = false;
        this.item = value.id;
        this.updated.emit(this.item);
    }
}
/**
 * The CustomSelectModule module, offers pre-configured multiple and single item selection components.
 */
@NgModule({
    imports: [ CommonModule, DropdownModule, PipeTransformModule, SelectModule ],
    declarations: [ MultiSelectInput, SingleSelectInput ],
    exports: [ MultiSelectInput, SingleSelectInput ]
})
export class CustomSelectModule {}




