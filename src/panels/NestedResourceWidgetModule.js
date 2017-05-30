import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

//internal
import {ResourcePanelModule}  from "./ResourcePanelModule.js";
import {AbstractResourceList} from "./AbstractResourceList.js";
import {HighlightService} from './HighlightService.js';

@Component({
    selector: 'nested-resource-widget',
    template:`
        <div class="panel panel-info repo">
            <div class="panel-heading">{{caption}}
                <span class="pull-right" *ngIf="options?.showActive">
                    <button type="button" class="btn btn-default btn-header"
                        [ngClass]="{'active': activeItem === null}" (click)="activeItem = null">    
                        <span class="glyphicon" [ngClass]="{'glyphicon-pencil': activeItem === null}"></span>
                    </button>
                </span>
            </div>
            <div class="panel-body">
                <toolbar-sort [options]="['Name', 'ID', 'Class']" (sorted)="_onSorted($event)"></toolbar-sort>
                <toolbar-add [options]="types" [transform]="_getClassLabel" (added)="_onAdded($event)"></toolbar-add>
                <toolbar-propertySettings [options]="_typeOptions" [transform]="_getClassLabel"
                                          (selectionChanged)="_hiddenTypesChanged($event)">
                </toolbar-propertySettings>

                <toolbar-filter [filter]="_searchString" [options]="['Name', 'ID', 'Class']"
                                (applied)="_onFiltered($event)"></toolbar-filter>

                <accordion [closeOthers]="true" dnd-sortable-container [dropZones]="_zones" [sortableData]="items">
                    <accordion-group *ngFor="let item of items 
                          | hideClass : hiddenTypes
                          | orderBy : _sortByMode
                          | filterBy: [_searchString, _filterByMode]
                          ; let i = index" class="list-group-item"
                                     dnd-sortable [sortableIndex]="i"
                                     (onOpen)="openItem = item"
                                     (onClose)="openItem = null"
                    >
                        <accordion-heading (click)="selectedItem = item">
                            <item-header [item]="item"
                                         [options]="options"
                                         [isActive]="item === activeItem"
                                         [isOpen]="item === openItem"
                                         (mouseover)="highlightedItem = item"
                                         (mouseout)="_unhighlight(item)"
                                         (activeItemChanged)="activeItem = item"
                                         [ngClass]="{highlighted: item === highlightedItem, active: item === selectedItem}">
                            </item-header>
                        </accordion-heading>
                        <div *ngIf="!options?.headersOnly">
                            <resource-panel *ngIf="item === openItem"
                                            [item]="item"
                                            [model]="model"
                                            (saved)="_onSaved(item)"
                                            (removed)="_onRemoved(item)">
                            </resource-panel>
                        </div>
                    </accordion-group>
                </accordion>
            </div>
        </div>
    `,
    styles: [` 
        .repo{ 
            width: 100%;
            border: 0;
            border-right:3px #eee solid;
            min-width: 380px;
            min-height: 300px;
        }
        .panel-heading{
          padding: 2px;
        }
        .highlighted {
          background-color: #e3d2d2;
        }
        .active {
          border: 2px solid #ff9999;
          padding: 2px;
        }
        :host >>> .btn-header{
          width: 16px;
          height: 16px;
          padding: 0;
        }
        :host >>> .btn-icon {
            height: 30px;
        }
        :host >>> .panel-body {
          padding: 0;
        }
        :host >>> .btn:focus ,.btn:active {
          outline: none !important;
        }    
        :host >>> .dropdown-toggle {
          padding: 6px;
        }
        :host >>> .panel-heading{
            padding: 0
        }
        :host >>> .accordion-toggle:hover {
          outline: none;
          text-decoration: none;
        }
        :host >>> .accordion-toggle:focus {
          outline: none;
          text-decoration: none;
        }
        :host >>> .list-group-item {
            padding: 0;
        }

    `]
})
/**
 * The NestedResourceWidget component, provides functionality for editing lists of entities.
 * @extends {AbstractResourceList}
 */
export class NestedResourceWidget extends AbstractResourceList{
    /**
     * @param {Resource} item - the active item
     */
    @Input('activeItem') set activeItem(item) {
        if (this._activeItem !== item) {
            this._activeItem = item;
            this.activeItemChange.emit(item);
        }
    }
    /**
     * @returns {Resource} - the active item
     */
    get activeItem() { return this._activeItem; }
    /**
     * @emits activeItemChange      - the active item changed
     */
    @Output() activeItemChange = new EventEmitter();

    /**
     * @returns {Array<string>} - the set of hidden resource classes
     */
    get hiddenTypes () {
        return Array.from(this._ignoreTypes);
    }

    _activeItem = null;
    _ignoreTypes = new Set();
    _typeOptions = [];

    /**
     * The constructor of the component
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     */
    constructor(highlightService: HighlightService){
        super(highlightService);
    }

    /**
     * Initialize the nested resource widget component: set invisible by default classes
     */
    ngOnInit(){
        super.ngOnInit();
        this._ignoreTypes.add(this.model.Border.name).add(this.model.Node.name);
        this._typeOptions = this.types.filter(x => this.model[x])
            .map(x => ({ selected: !this._ignoreTypes.has(x), value: x }));
    }

    /**
     * @param {Object} option - the object with the field "value" that defines the resource class and
     *  the boolean field "selected" that indicates whether the value is selected or not.
     */
    _hiddenTypesChanged(option){
        if ( this._ignoreTypes.has(option.value) &&  option.selected) {
            this._ignoreTypes.delete(option.value);
        }
        if (!this._ignoreTypes.has(option.value) && !option.selected) {
            this._ignoreTypes.add(option.value);
        }
    }
}

/**
 * The NestedResourceModule module, offers the NestedResourceWidget panel.
 */
@NgModule({
    imports:      [ CommonModule, ResourcePanelModule  ],
    declarations: [ NestedResourceWidget ],
    providers:    [ HighlightService ],
    exports:      [ NestedResourceWidget ]
})
export class NestedResourceWidgetModule {}


