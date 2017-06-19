import {Component, Input} from '@angular/core';
import {AbstractResourceList} from "./AbstractResourceList";
import {HighlightService} from './HighlightService.js';
import {ToastyService} from 'ng2-toasty';

@Component({
    selector: 'nested-resource-list',
    template: `
        <div class="panel repo-nested">
            <div class="panel-heading"><label>{{caption}}: </label></div>
            <div class="panel-body">
                <span *ngIf="!(options?.readOnly || options?.headersOnly)">
                    <select-input class="pull-left input-select"
                                    [items]    = "_itemsToInclude"
                                    [options]  = "possibleValues"
                                    [multiple] = "false"
                    >
                    </select-input>
                    <button type="button" class="btn btn-default btn-icon" (click)="_onIncluded()">
                        <span class="glyphicon glyphicon-save"></span>
                    </button>
                </span>

                <toolbar-sort *ngIf="options?.sortToolbar" [options]="['Name', 'ID', 'Class']"
                              (sorted)="_onSorted($event)"></toolbar-sort>
                <toolbar-add *ngIf="!(options?.readOnly || options?.headersOnly)" [options]="_typeNames"
                             [transform]="_getClassLabel" (added)="_onAdded($event)"></toolbar-add>
                <toolbar-filter *ngIf="options?.filterToolbar" [options]="['Name', 'ID', 'Class']"
                                [filter]="_searchString" (applied)="_onFiltered($event)"></toolbar-filter>

                <accordion [closeOthers]="true"
                           dnd-sortable-container [dropZones]="_typeNames" [sortableData]="items">
                    <accordion-group *ngFor="let item of items 
                        | filterBy: [_searchString, _filterByMode]; let i = index" class="list-group-item"
                                     dnd-sortable [sortableIndex]="i"
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
                                            [resourceClasses]="resourceClasses"
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
    /**
     * @type {Object} type      - the displayed item type (resource class)
     */
    @Input() type;

    _itemsToInclude = new Set();

    /**
     * The constructor of the component
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     */
    constructor(highlightService: HighlightService, toastyService: ToastyService) {
        super(highlightService, toastyService);
    }


    /**
     * Initialize the component
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.type){
            //Make a list of all subclasses to filter or choose which class to add ?
            //this._typeNames = [...this.type.allSubclasses()].map(x => x.name);
            this._typeNames = [this.type.name];

            //If selectionOptions are not provided by parent, subscribe and get all for given type
            if (!this.possibleValues) {
                this._ts = this.type.p('all').subscribe( (data) => { this.possibleValues = data; });
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
                let a1 = a;
                let follow_a = [];
                let b1 = [...a1['-->IsRadiallyAdjacent']];
                while (b1.length > 0){
                    follow_a.push(b1[0]);
                    a1 = b1[0];
                    b1 = [...a1['-->IsRadiallyAdjacent']];
                }
                return ( follow_a.includes(b) )
            });
        }
    }

    _onDragEnd(index) {
        if (this.items.length < 2 || !this.options.ordered) { return; }
        for (let i = 1; i < this.items.length; i++){
            this.resourceFactory(this.resourceClasses.IsRadiallyAdjacent.name,
                {1: this.items[i-1], 2: this.items[i]});
        }
        // for (let i = 1; i < this.items.length; i++) {
        //     console.log(this.items[i].name, this.items[i]['-->IsRadiallyAdjacent']);
        // }
        this.updated.emit(this.items);
    }

    /**
     * Include a selected resource to the current list
     * @param {Resource} newItem - the selected resource to include to the current list
     */
    _onIncluded() {
        for (let newItem of Array.from(this._itemsToInclude)){
            if (!newItem){ continue; }
            if (!this.items.includes(newItem)) {
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
