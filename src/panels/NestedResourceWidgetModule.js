import {NgModule, Component, Input} from '@angular/core';
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
              [ngClass]="{'active': activeItem === null}" (click)="updateActive(null)">
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

          <accordion-group  *ngFor="let item of items 
            | hideClass : hiddenTypes
            | orderBy : sortByMode
            | filterBy: [searchString, filterByMode]; let i = index" dnd-sortable [sortableIndex]="i"> 

            <accordion-heading
              (click)    ="updateSelected(item)" 
              (mouseover)="updateHighlighted(item)" (mouseout)="cleanHighlighted(item)"
              [ngClass]  ="{highlighted: _highlightedItem === item}">
              
              <item-header [item]= "item" 
                [selectedItem]   = "selectedItem" 
                [isSelectedOpen] = "isSelectedOpen" 
                [icon]           = "getResourceIcon(item)">   
                <!--<extra *ngIf="options?.showActive">-->
                  <!--<button type="button" class="btn btn-default btn-header" -->
                    <!--[ngClass]="{'active': activeItem === item}" (click)="updateActive(item)">-->
                    <!--<span class = "glyphicon" [ngClass]="{'glyphicon-pencil': activeItem === item}"></span>-->
                  <!--</button>-->
                <!--</extra>-->
              </item-header>
            </accordion-heading>

            <div *ngIf="!options?.headersOnly">
              <resource-panel *ngIf="item === selectedItem" [item]="item"
                (saved)   ="onSaved(item, $event)" 
                (canceled)="onCanceled($event)"
                (removed) ="onRemoved(item)"
                (highlightedItemChange)="highlightedItemChange.emit($event)">
               </resource-panel>   
            </div>
                
          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
    styles: [        `
        .repo{ 
            width: 100%;
            border: 0;
            border-right:3px #eee solid;
            min-width: 380px;
            min-height: 300px;
        }
        .panel-body{
          padding: 0px;
        }
        accordion-group{
          padding: 0px;
        }
        .panel-heading{
          padding: 2px;
        }
        .highlighted{
          background-color: #e3d2d2;
        }
        .btn:focus,.btn:active {
          outline: none !important;
        }
        
        .btn-header{
          width: 16px;
          height: 16px;
          padding: 0;
        }
    `],
    styleUrls: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
})
export class NestedResourceWidget extends AbstractResourceList{
    @Input() activeItem: any = null;
    @Input() highlightedItem: any = null;

    ignoreTypes = new Set([model.Border.name, model.Node.name]);

    typeOptions = [];

    constructor(highlightService: HighlightService){
        super(highlightService);
        this.highlightService = highlightService;
    }

    ngOnInit(){
        super.ngOnInit();
        this.typeOptions = this.types.filter(x => x.class !== modelClassNames.LyphWithAxis).map(x => (
            { selected: !this.ignoreTypes.has(x), value: x }
        ));
        //this.typeOptions.push({selected: !this.ignoreTypes.has("Type"), value: "Type"});
    }

    ngOnChanges(changes: { [propName: string]: any }) {
        if( changes['highlightedItem'] && changes['highlightedItem'].previousValue !== changes['highlightedItem'].currentValue ) {
            if (this.highlightService){
                this.highlightService.highlight(this.highightedItem);
            }
        }
    }

    hiddenTypesChanged(option: any){
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
    providers:    [ HighlightService     ],
    exports:      [ NestedResourceWidget ]
})
export class NestedResourceWidgetModule {}


