import {Component, Input} from '@angular/core';
import {AbstractResourceList} from "./AbstractResourceList";
import {HighlightService} from './HighlightService.js';
import {ToastyService} from 'ng2-toasty';
import {SetToArray, FilterBy} from "../common/PipeTransformModule";

@Component({
    selector: 'nested-resource-list',
    template: `
        <div class="panel repo-nested">
            <div class="panel-heading"><label>{{caption}}: </label></div>
            <div class="panel-body">
                <span *ngIf="!(options?.readOnly || options?.headersOnly)">
                    <select-input-1 class = "pull-left input-select"
                              [item]   = "_itemToInclude"
                              (updated)= "_itemToInclude = $event"
                              [options]= "possibleValues">
                    </select-input-1>
                    <button type="button" class="btn btn-default btn-icon" (click)="_onIncluded(_itemToInclude)">
                        <span class="glyphicon glyphicon-save"></span>
                    </button>
                </span>

                <toolbar-sort *ngIf="options?.sortToolbar" [options]="['Name', 'ID', 'Class']"
                              (sorted)="_onSorted($event)"></toolbar-sort>
                <toolbar-add *ngIf="!(options?.readOnly || options?.headersOnly)" [options]="types"
                              [transform]="_getClassLabel" (added)="_onAdded($event)"></toolbar-add>
                <toolbar-filter *ngIf="options?.filterToolbar" [options]="['Name', 'ID', 'Class']"
                              [filter]="_searchString" (applied)="_onFiltered($event)"></toolbar-filter>

                <accordion [closeOthers]="true"
                           dnd-sortable-container [dropZones]="_zones" [sortableData]="items">
                    <accordion-group *ngFor="let item of items 
                        | filterBy: [_searchString, _filterByMode]; let i = index" class="list-group-item"
                                     dnd-sortable [dragEnabled]=true
                                     [sortableIndex]="i"
                                     (onDragEnd)="_onDragEnd(i)"
                                     (onOpen)="openItem = item"
                                     (onClose)="openItem = null">

                        <accordion-heading (click)="selectedItem = item">
                            <item-header [item]="item"
                                         [isOpen]="item === openItem"
                                         (mouseover)="highlightedItem = item"
                                         (mouseout)="_unhighlight(item)"
                                         [ngClass]="{highlighted: item === highlightedItem, active: item === selectedItem}">
                            </item-header>
                        </accordion-heading>

                        <div *ngIf="!options?.headersOnly">
                            <resource-panel *ngIf="item === openItem"
                                            [item]="item"
                                            [model]="model"
                                            [options]="options"
                                            (saved)="_onSaved(item)"
                                            (removed)="_onRemoved(item)"
                                            (highlightedItemChange)="highlightedItemChange.emit($event)"
                            ></resource-panel>
                        </div>
                    </accordion-group>
                </accordion>
            </div>
        </div>
    `,
    styles: [`
        .input-select {
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
 * @extends {AbstractResourceList}
 */
export class NestedResourceList extends AbstractResourceList {
    /**
     *  the list of resources that can be added to the current list
     */
    @Input() possibleValues;

    _itemToInclude = null;

    /**
     * The constructor of the component
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     */
    constructor(toastyService: ToastyService, highlightService: HighlightService) {
        super(highlightService);
        this._toastyService = toastyService;
    }

    /**
     * Initialize the component
     */
    ngOnInit() {
        super.ngOnInit();

        //If selectionOptions are not provided by parent, subscribe and get all for given types
        if (!this.possibleValues) {
            if (this.types.length === 1) {
                this._ts = this.model[this.types[0]].p('all').subscribe(
                    (data) => {
                        this.possibleValues = data;
                    });
            } else {
                if (this.types.length > 1) {
                    let setToArray = new SetToArray();
                    let filterByClass = new FilterBy();

                    this._ts = this.model.Template.p('all').subscribe(
                        (data) => {
                            this.possibleValues = new Set(
                                filterByClass.transform(setToArray.transform(data), [this.types, 'class']))
                        });
                }
            }
        }
    }

    /**
     * Unsubscribe from subscriptions
     */
    ngOnDestroy() {
        if (this._ts) {
            this._ts.unsubscribe();
        }
    }

    /**
     * Update the view in response to external data change (e.g., sort layers)
     * @param {Object} changes - the object defining input data changes
     */
    ngOnChanges(changes) {
        if (this.items && this.options.ordered) {
            this.items.sort((a, b) => {
                return (a['-->IsRadiallyAdjacent']
                && a['-->IsRadiallyAdjacent'][2]
                && a['-->IsRadiallyAdjacent'][2].includes(b))
            });
        }
    }

    //TODO: update new "Follows" relationship
    _onDragEnd(index) {
        if (!this.options.ordered) {
            return;
        }
        //TODO: un-comment when the model libarry supports operations with this relationship (or other way to order)
        //IsRadiallyAdjacent relation has cardinality [0..*]
        // for (let i = 1; i < this.items.length; i++){
        //     if (this.items[i]['-->IsRadiallyAdjacent'] && this.items[i]['-->IsRadiallyAdjacent'][2]){
        //         if (!this.items[i]['-->IsRadiallyAdjacent'][2].includes(this.items[i - 1])){
        //             this.items[i]['-->IsRadiallyAdjacent'][2] = [this.items[i - 1]];
        //         }
        //     } else {
        //         this.model.isRadiallyAdjacent.new({1: this.items[i - 1], 2: this.items[i]});
        //     }
        // }
        // if (this.items.length > 1) {
        //     if (this.items[this.items.length - 1]['-->IsRadiallyAdjacent'] !== null){
        //         this.items[i]['-->IsRadiallyAdjacent'].delete();
        //     }
        // }
        // this.updated.emit(this.items);
    }

    /**
     * Include a selected resource to the current list
     * @param {Resource} newItem - the selected resource to include to the current list
     */
    _onIncluded(newItem) {
        if (newItem) {
            if (this.items.indexOf(newItem) < 0) {
                this.items.push(newItem);
                this.updated.emit(this.items);
                this.added.emit(newItem);
                this.selectedItem = newItem;
            } else {
                this._toastyService.error("Selected resource is already included to the set!");
            }
        }
    }
}
