import {Injectable, Input, Output, EventEmitter} from '@angular/core';
import {modelClassNames, getClassLabel, getResourceIcon, model} from "../common/utils";
import {Subscription}   from 'rxjs/Subscription';

import {HighlightService} from './HighlightService.js';

export class AbstractResourceList {
    @Input() caption: string = "Resources";
    @Input() selectedItem = null;
    @Input() items: Array<any> = [];
    @Input() types: Array<any> = [];
    @Input() options = {};
    @Input() selectionOptions;

    @Output() added = new EventEmitter();
    @Output() removed = new EventEmitter();
    @Output() updated = new EventEmitter();
    @Output() selectedItemChange = new EventEmitter();
    @Output() activeItemChange = new EventEmitter();
    @Output() highlightedItemChange = new EventEmitter();

    _selectedItem;
    _activeItem;
    _highlightedItem;

    zones: Array<string> = [];

    sortByMode: string = "unsorted";
    filterByMode: string = "Name";
    searchString: string = "";
    isSelectedOpen: boolean = false;

    hs: Subscription;

    getClassLabel = getClassLabel;
    getResourceIcon = getResourceIcon;

    constructor(highlightService: HighlightService){
        this.hs = highlightService.highlightedItemChanged$.subscribe(item => {
            if (this.items.indexOf(item) > -1){
                if (this._highlightedItem !== item)
                    this._highlightedItem = item;
            }
        })
    }

    ngOnDestroy() {
        if (this.hs) this.hs.unsubscribe();
    }

    set selectedItem (item) {
        if (this._selectedItem !== item){
            this._selectedItem = item;
            this.selectedItemChange.emit(item);
        }
    }

     get selectedItem () {
        return this._selectedItem;
    }

     set activeItem (item) {
        if (this._activeItem !== item){
            this._activeItem = item;
            this.activeItemChange.emit(item);
        }
    }

     get activeItem () {
        return this._activeItem;
    }

     set highlightedItem (item) {
        if (this.highlightedItem !== item){
            this._highlightedItem = item;
            this.highlightedItemChange.emit(item);
        }
    }

     get highlightedItem () {
        return this._highlightedItem;
    }

    unhighlight(item){
        if (this.highlightedItem === item) {
            this.highlightedItem = null;
        }
    }

    ngOnInit(){
        if (!this.items) this.items = [];
        if (this.items[0] || !this.selectedItem)
            this.selectedItem = this.items[0];
        //Resources
        if (this.types.length === 0) {
            this.types = Object.keys(modelClassNames);
        }
        this.zones = this.types.map(x => x + "_zone");
    }

    updateSelected(item){
        this.selectedItem = item;
        this.isSelectedOpen = !this.isSelectedOpen;
    }

     onSorted(prop: string){
        this.sortByMode = prop.toLowerCase();
    }

     onFiltered(config){
        this.filterByMode = config.mode.toLowerCase();
        this.searchString = config.filter;
    }

     onSaved(item, updatedItem){
        this.updated.emit(this.items);
        if (item === this.selectedItem){
            this.selectedItemChange.emit(this.selectedItem);
        }
    }

     onCanceled(updatedItem){}

     onRemoved(item){
        if (!this.items) return;
        let index = this.items.indexOf(item);
        if (index > -1) this.items.splice(index, 1);
        if (item === this.selectedItem){
            if (this.items.length > 0)
                this.selectedItem = this.items[0];
            else
                this.selectedItem = null;
        }
        item.delete();
        this.removed.emit(item);
        this.updated.emit(this.items);
    }

     onAdded(clsName){
        let options = {};
        if (clsName === modelClassNames.LyphWithAxis) {
            clsName = model.Lyph.name;
            options.createAxis = true;
        }
        if (clsName === model.Lyph.name) {
            options.createRadialBorders = true;
        }

        let newItem = model[clsName].new({name: `New ${clsName}`}, options);

        if (clsName === model.Material.name) {
            let newType = model.Type.new({name: newItem.name, definition: newItem});
            newItem.p('name').subscribe(newType.p('name'));
        }

        this.items.push(newItem);
        this.updated.emit(this.items);
        this.added.emit(newItem);
        this.selectedItem = newItem;
    }
}
