/**
 * Created by Natallia on 4/13/2017.
 */
import {NgModule, Component, Pipe, PipeTransform, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PipeTranformModule} from '../common/pipes';
import {DropdownModule} from 'ngx-dropdown';

@Pipe({name: 'mapToOptions'})
class MapToOptions implements PipeTransform {
    transform(items: Array<any> = []): any {
        return items.filter(x => (x.name && (x.name !== ""))).map((entry: any) => ({
            id: entry,
            text: entry.name? entry.name: "(Unnamed) " + entry.class
        }))
    }
}

@Pipe({name: 'mapToCategories'})
class MapToCategories implements PipeTransform {
    transform(items: Array<any> = []): any {
        let types = Array.from(new Set(items.map(item => item.type)));
        let typedItems: Array<any> = [];
        for (let type of types){
            let typed = items.filter(item => (item.type === type));
            typedItems.push({text: type, children: typed});
        }
        return typedItems;
    }
}

@Component({
    selector: 'select-input',
    template: `
      <div *ngIf="active">
      <ng-select
        [items]       = "options | setToArray | mapToOptions"
        [initData]    = "items   | setToArray | mapToOptions"
        [disabled]    = "disabled"
        [multiple]    = "true"
        [allowClear]  = "true"
        (data)        = "refreshValue($event)"
      ></ng-select>
    </div>
    `,
    styleUrls: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],
})
export class MultiSelectInput {
    @Input()  items   = new Set();
    @Input()  options = new Set();
    @Output() updated = new EventEmitter();

    active = true;

    externalChange = false;
    ngOnChanges(changes: {[propName: string]: any}) {
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
    inputs: ['item', 'options', 'disabled'],
    template:`
    <div *ngIf="active">
      <ng-select
        [items]       = "options | setToArray | mapToOptions"
        [initData]    = "items | mapToOptions"
        [multiple]    = false
        [allowClear]  = true
        [disabled]    = "disabled"
        (data)        = "refreshValue($event)"
      ></ng-select>
    </div>
  `,
    directives: [SELECT_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    pipes: [MapToOptions, SetToArray]
})
export class SingleSelectInput {
    @Input()  item    = new Set();
    @Input()  options = new Set();
    @Output() updated = new EventEmitter();

    active = true;

    externalChange = false;
    ngOnChanges(changes: {[propName: string]: any}) {
        if (this.externalChange){
            setTimeout(() => {this.active = false}, 0);
            setTimeout(() => {this.active = true},  0);
        }
        this.externalChange = true;
    }

    public refreshValue(value = {}):void {
        this.externalChange = false;
        this.item = value.id;
        this.updated.emit(this.item);
    }

    public get items () {
        return [this.item || {}];
    }
}

@NgModule({
    imports: [ BrowserModule, DropdownModule, MapToOptions, MapToCategories, PipeTranformModule ],
    declarations: [ MultiSelectInput, SingleSelectInput ],
    exports: [ MultiSelectInput, SingleSelectInput ]
})
export class SelectModule {}




