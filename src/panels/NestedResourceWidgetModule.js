import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastyService} from 'ng2-toasty';

//internal
import {ResourcePanelModule}  from "./ResourcePanelModule.js";
import {AbstractResourceList} from "./AbstractResourceList.js";
import {HighlightService} from './HighlightService.js';

import moduleFactory from '../../node_modules/open-physiology-manifest/src/index.js';

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
                <toolbar-add [options]="_typeNames" [transform]="_getClassLabel"
                             (added)="_onAdded($event)"></toolbar-add>
                <toolbar-propertySettings [options]="_typeOptions" [transform]="_getClassLabel"
                                          (selectionChanged)="_ignoreTypesChanged($event)">
                </toolbar-propertySettings>

                <toolbar-filter [filter]="_searchString" [options]="['Name', 'ID', 'Class']"
                                (applied)="_onFiltered($event)"></toolbar-filter>

                <accordion [closeOthers]="true" dnd-sortable-container [dropZones]="_typeNames" [sortableData]="items">
                    <accordion-group *ngFor="let item of items 
                          | hideClass : _hiddenTypes
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
                                            [resourceClasses]="resourceClasses"
                                            [resourceFactory]="resourceFactory"
                                            (saved)   ="_onSaved(item)"
                                            (removed) ="_onRemoved(item)">
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
     *
     * @returns {Array} - hidden types
     * @private
     */
    get _hiddenTypes(){
        return Array.from(this._ignoreTypes);
    }

    /**
     * @type {Array<Resource>} types      - the list of displayed item types (resource classes)
     */
    @Input() types = [];

    /**
     * Objects that define classes of open-physiology resources
     */
    resourceClasses = moduleFactory().classes;

    _activeItem  = null;
    _ignoreTypes = new Set();
    _hiddenTyes  = [];
    _typeOptions = [];

    /**
     * The constructor of the component
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     */
    constructor(highlightService: HighlightService, toastyService: ToastyService) {
        super(highlightService, toastyService);
    }

    /**
     * Initialize the nested resource widget component: set invisible by default classes
     */
    ngOnInit(){
        super.ngOnInit();

        if (this.types.length === 0) {
            //If no specific class was set, the widget works with any class
            for (let cls of Object.values(this.resourceClasses)){
                if (cls.isResource && !cls.abstract){
                    this.types.push(cls);
                    if (cls.name === this.resourceClasses.Lyph.name){
                        this._typeNames.push("LyphWithAxis");
                    }
                }
            }
        }
        this._typeNames = this.types.map(x => x.name);
        this._ignoreTypes = new Set([this.resourceClasses.Border.name,this.resourceClasses.Node.name]);
        this._typeOptions = this._typeNames.filter(x => this.resourceClasses[x])
            .map(x => ({ selected: !this._ignoreTypes.has(x), value: x }));
    }

    /**
     * @param {Object} option - the object with the field "value" that defines the resource class and
     *  the boolean field "selected" that indicates whether the value is selected or not.
     */
    _ignoreTypesChanged(option){
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
    imports:      [
        CommonModule,
        ResourcePanelModule ],
    declarations: [ NestedResourceWidget ],
    providers:    [ HighlightService, ToastyService ],
    exports:      [ NestedResourceWidget ]
})
export class NestedResourceWidgetModule {}


