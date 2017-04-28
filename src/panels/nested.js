/**
 * Created by Natallia on 4/18/2017.
 */
"use strict";
import {Component, SkipSelf, Host} from '@angular/core';
import {AbstractResourceList, HighlightService} from "./abstract";
import {SetToArray, FilterBy} from "../common/pipes";
import {model} from "../common/utils";

@Component({
    selector: 'nested-resource-list',
    template:`
    <div class="panel repo-nested">
      <div class="panel-heading"> <label>{{caption}}: </label></div>
      <div class="panel-body" >
        <span  *ngIf = "!(options?.readOnly || options?.headersOnly)">
          <select-input-1 class="pull-left input-select" [item] = "itemToInclude"
           (updated) = "updateItemToInclude($event)"    
           [options] = "selectionOptions">
          </select-input-1>
          <button type="button" class="btn btn-default btn-icon" (click)="onIncluded(itemToInclude)">
            <span class="glyphicon glyphicon-save"></span>
          </button>
        </span>
        
        <toolbar-sort   *ngIf =  "options?.sortToolbar"  [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></toolbar-sort>
        <toolbar-add    *ngIf = "!(options?.readOnly || options?.headersOnly)"  [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></toolbar-add>
        <toolbar-filter *ngIf =  "options?.filterToolbar" [options]="['Name', 'ID', 'Class']" [filter]="searchString" (applied)="onFiltered($event)"></toolbar-filter>
          
        <accordion class="list-group" [closeOthers]="true"
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items 
            | orderBy : sortByMode 
            | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable (onDragStart)="onDragStart()" (onDragEnd)="onDragEnd()"
           [sortableIndex]="i">
            <div accordion-heading 
              (click)="updateSelected(item)" 
              (mouseover)="updateHighlighted(item)" (mouseout)="cleanHighlighted(item)"
              [ngClass]="{highlighted: _highlightedItem === item}">
              <item-header [item]="item" 
                [selectedItem]="selectedItem" 
                [isSelectedOpen]="isSelectedOpen" 
                [icon]="getResourceIcon(item)">
              </item-header>
            </div>

            <div *ngIf="!options?.headersOnly">
              <resource-panel *ngIf="item === selectedItem" 
                [item]    ="item" 
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
    <!--<ng2-toasty></ng2-toasty>-->
  `,
    styleUrls: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
})
export class NestedResourceList extends AbstractResourceList{
    itemToInclude: any = null;

    constructor(/*toastyService: ToastyService,*/ highlightService: HighlightService){
        super(highlightService);
        //this.toastyService = toastyService;
    }

    ngOnInit(){
        super.ngOnInit();

        //If selectionOptions are not provided by parent, subscribe and get all for given types
        if (!this.selectionOptions) {
            if (this.types.length === 1){
                this.ts = model[this.types[0]].p('all').subscribe(
                    (data: any) => {
                        this.selectionOptions = data;
                    });
            } else {
                if (this.types.length > 1){
                    let setToArray = new SetToArray();
                    let filterByClass = new FilterBy();

                    this.ts = model.Template.p('all').subscribe(
                        (data: any) => {this.selectionOptions = new Set(
                            filterByClass.transform(setToArray.transform(data), [this.types, 'class']))});
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.ts) { this.ts.unsubscribe(); }
    }

    ngOnChanges(changes: { [propName: string]: any }) {
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

    onIncluded(newItem: any){
        if (newItem){
            if (this.items.indexOf(newItem) < 0){

                this.items.push(newItem);
                this.updated.emit(this.items);
                this.added.emit(newItem);
                this.selectedItem = newItem;

            } else {
                //this.toastyService.error("Selected resource is already included to the set!");
            }
        }
    }

    updateItemToInclude(item){
        this.itemToInclude = item;
    }
}
