import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeTransformModule} from '../PipeTransformModule';
import {DropdownModule} from 'ngx-dropdown';
import {SelectModule} from 'ng2-select';

@Component({
    selector: 'select-input',
    template: `
      <div *ngIf="active">
          <ng-select
            [items]       = "options | setToArray | mapToOptions"
            [active]      = "items   | setToArray | mapToOptions"
            [disabled]    = "disabled"
            [multiple]    = "true"
            [allowClear]  = "true"
            (data)        = "refreshValue($event)"
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
    @Input()  items   = new Set();
    @Input()  options = new Set();
    @Input()  disabled = false;
    @Output() updated = new EventEmitter();

    active = true;

    externalChange = false;
    ngOnChanges(changes) {
        if (this.externalChange){
            setTimeout(() => { this.active = false }, 0);
            setTimeout(() => { this.active = true  }, 0);
        }
        this.externalChange = true;
    }

    refreshValue(value: Array<any>):void {
        this.externalChange = false;
        let newItems = value.map(x => x.id);
        this.updated.emit(new Set(newItems));
    }
}

@Component({
    selector: 'select-input-1',
    template:`
    <div *ngIf="active">
      <ng-select
        [items]       = "options | setToArray | mapToOptions"
        [active]      = "[item || {}] | mapToOptions"
        [multiple]    = false
        [allowClear]  = true
        [disabled]    = "disabled"
        (data)        = "refreshValue($event)"
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
    @Input()  item    = new Set();
    @Input()  options = new Set();
    @Input()  disabled = false;
    @Output() updated = new EventEmitter();

    active = true;
    externalChange = false;

    ngOnChanges(changes) {
        if (this.externalChange){
            setTimeout(() => {this.active = false}, 0);
            setTimeout(() => {this.active = true},  0);
        }
        this.externalChange = true;
    }

    refreshValue(value = {}):void {
        this.externalChange = false;
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




