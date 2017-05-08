import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

//external
import {modelClassNames, model} from "../common/utils";

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
              [ngClass]="{'active': activeItem === null}" (click)="activeItem = item">
              <span class = "glyphicon" [ngClass]="{'glyphicon-pencil': activeItem === null}"></span>
            </button>
          </span>
        </div>
        <div class="panel-body">
          <toolbar-sort  [options]="['Name', 'ID', 'Class']" (sorted)="onSorted($event)"></toolbar-sort>
          <toolbar-add   [options]="types" [transform]="getClassLabel" (added)="onAdded($event)"></toolbar-add>
          <toolbar-propertySettings  [options] = "typeOptions" [transform] = "getClassLabel" 
            (selectionChanged) = "hiddenTypesChanged($event)">
          </toolbar-propertySettings>

          <toolbar-filter [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></toolbar-filter>
                   
          <accordion [closeOthers]="true" 
            dnd-sortable-container [dropZones]="zones" [sortableData]="items">

              <accordion-group *ngFor="let item of items 
                | hideClass : hiddenTypes
                | orderBy : sortByMode
                | filterBy: [searchString, filterByMode]; let i = index" dnd-sortable [sortableIndex]="i"
                (onOpen) ="openItem = item"
                (onClose)="openItem = null">
    
                <accordion-heading (click)  ="selectedItem = item">                  
                  <item-header [item]= "item" 
                    [options]      = "options"
                    [isActive]     = "item === activeItem"
                    [isOpen]       = "item === openItem" 
                    (mouseover)    = "highlightedItem = item" 
                    (mouseout)     = "unhighlight(item)"
                    (activeItemChanged) = "activeItem = item"
                    [ngClass] ="{highlighted: item === highlightedItem, active: item === selectedItem}">   
                  </item-header>
                </accordion-heading>
    
                <div *ngIf="!options?.headersOnly">
                  <resource-panel *ngIf="item === openItem" 
                    [item]="item"
                    (saved)   ="onSaved(item, $event)" 
                    (removed) ="onRemoved(item)">
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
    `]
})
/**
 * The NestedResourceWidget component, provides functionality for editing lists of entities.
 * Inherits input parameters and emitted events from AbstractResourceList
 *
 * @param {Resource} activeItem - the active item
 * @emits activeItemChange      - the active item changed
 *
 */
export class NestedResourceWidget extends AbstractResourceList{
    @Input('activeItem') set activeItem(item) {
        if (this._activeItem !== item) {
            this._activeItem = item;
            this.activeItemChange.emit(item);
        }
    }
    get activeItem() { return this._activeItem; }
    @Output() activeItemChange = new EventEmitter();

    _activeItem;

    ignoreTypes = new Set([model.Border.name, model.Node.name]);
    typeOptions = [];

    constructor(highlightService: HighlightService){
        super(highlightService);
    }

    ngOnInit(){
        super.ngOnInit();
        this.typeOptions = this.types.filter(x => x.class !== modelClassNames.LyphWithAxis).map(x => (
            { selected: !this.ignoreTypes.has(x), value: x }
        ));
    }

    hiddenTypesChanged(option){
        if ( this.ignoreTypes.has(option.value) &&  option.selected) {
            this.ignoreTypes.delete(option.value);
        }
        if (!this.ignoreTypes.has(option.value) && !option.selected) {
            this.ignoreTypes.add(option.value);
        }
    }

    get hiddenTypes () {
        return Array.from(this.ignoreTypes);
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


