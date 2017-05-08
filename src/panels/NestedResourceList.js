import {Component, Input} from '@angular/core';
import {AbstractResourceList} from "./AbstractResourceList";
import {HighlightService} from './HighlightService.js';
import {ToastyService} from 'ng2-toasty';
import {SetToArray, FilterBy} from "../common/PipeTransformModule";

@Component({
    selector: 'nested-resource-list',
    template:`
    <div class="panel repo-nested">
      <div class="panel-heading"> <label>{{caption}}: </label></div>
      <div class="panel-body" >
        <span  *ngIf = "!(options?.readOnly || options?.headersOnly)">
          <select-input-1 class="pull-left input-select" 
            [item] = "itemToInclude"
            (updated) = "itemToInclude = $event"    
            [options] = "possibleValues">
          </select-input-1>
          <button type="button" class="btn btn-default btn-icon" (click)="onIncluded(itemToInclude)">
            <span class="glyphicon glyphicon-save"></span>
          </button>
        </span>
        
        <toolbar-sort   *ngIf =  "options?.sortToolbar"  [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></toolbar-sort>
        <toolbar-add    *ngIf = "!(options?.readOnly || options?.headersOnly)"  [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></toolbar-add>
        <toolbar-filter *ngIf =  "options?.filterToolbar" [options]="['Name', 'ID', 'Class']" [filter]="searchString" (applied)="onFiltered($event)"></toolbar-filter>
          
        <accordion [closeOthers]="true"
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items 
            | orderBy : sortByMode
            | filterBy: [searchString, filterByMode]; let i = index" 
                dnd-sortable (onDragStart)="onDragStart()" (onDragEnd)="onDragEnd()" [sortableIndex]="i"
                (onOpen) ="openItem = item"
                (onClose)="openItem = null">
 
            <accordion-heading (click)  ="selectedItem = item">
              <item-header [item]="item" 
                [isOpen]       = "item === openItem" 
                (mouseover)    = "highlightedItem = item" 
                (mouseout)     = "unhighlight(item)"
                [ngClass] ="{highlighted: item === highlightedItem, active: item === selectedItem}">
              </item-header>
            </accordion-heading>

            <div *ngIf="!options?.headersOnly">
              <resource-panel *ngIf="item === openItem" 
                [item]    ="item" 
                [model]="model"
                [options] ="options"
                (saved)   ="onSaved(item, $event)" 
                (removed) ="onRemoved(item)"
                (highlightedItemChange)="highlightedItemChange.emit($event)"
                ></resource-panel>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
    styles: [`
        .input-select{
          min-width: 100px;
        }
        .highlighted {
          background-color: #e3d2d2;
        }
        .active {
          border: 2px solid #ff9999;
          padding: 2px;
        }
    `]
})
/**
 * The NestedResourceList component, provides functionality for editing lists of resources.
 * Inherits input parameters and emitted events from AbstractResourceList
 *
 * @param {Array<Resource>} possibleValues - the list of resources that can be added to the current list
 */
export class NestedResourceList extends AbstractResourceList{
    @Input() possibleValues;

    itemToInclude = null;

    constructor(toastyService: ToastyService, highlightService: HighlightService){
        super(highlightService);
        this.toastyService = toastyService;
    }

    ngOnInit(){
        super.ngOnInit();

        //If selectionOptions are not provided by parent, subscribe and get all for given types
        if (!this.possibleValues) {
            if (this.types.length === 1){
                this.ts = this.model[this.types[0]].p('all').subscribe(
                    (data) => { this.possibleValues = data; });
            } else {
                if (this.types.length > 1){
                    let setToArray = new SetToArray();
                    let filterByClass = new FilterBy();

                    this.ts = this.model.Template.p('all').subscribe(
                        (data) => {this.possibleValues = new Set(
                            filterByClass.transform( setToArray.transform(data), [this.types, 'class']))});
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.ts) { this.ts.unsubscribe(); }
    }

    ngOnChanges(changes) {
        if (this.items) {
            if (this.options.ordered) {
                this.items.sort((a, b) => {
                    return (a['-->HasLayer'].relativePosition - b['-->HasLayer'].relativePosition)
                });
            }
        }
    }

    onDragStart(index: number){ }

    onDragEnd(index: number){
        if (this.options.ordered){
            for (let i = 0; i < this.items.length; i++){
                this.items[i]['-->HasLayer'].relativePosition = i;
            }
            this.updated.emit(this.items);
        }
    }

    onIncluded(newItem){
        if (newItem){
            if (this.items.indexOf(newItem) < 0){
                this.items.push(newItem);
                this.updated.emit(this.items);
                this.added.emit(newItem);
                this.selectedItem = newItem;
            } else {
                this.toastyService.error("Selected resource is already included to the set!");
            }
        }
    }
}
