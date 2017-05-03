import {Input, Output, EventEmitter} from '@angular/core';
import {modelClassNames, getClassLabel, model} from "../common/utils";
import {Subscription}   from 'rxjs/Subscription';
import {HighlightService} from './HighlightService.js';

/**
 * The AbstractResourceList class implements methods common for upper level and nested resource lists.
 *
 * @param {string} caption           - the header of the list
 * @param {Array<Resource>} items    - the list of displayed resources
 * @param {Array<string>} types      - the list of displayed item types (resource classes)
 * @param {Object} options           - the configuration options for the list appearance
 *      @example {headersOnly: false, readOnly: false, sortToolbar: true, filterToolbar: true, showActive: false}
 * @param {Resource} selectedItem    - the selected resource
 * @param {Resource} highlightedItem - the highlighted resource
 *
 * @emits added                 - a new item added to the list
 * @emits removed               - an item removed from the list
 * @emits updated               - an item in the list has been updated
 * @emits selectedItemChange    - the selected item changed
 * @emits highlightedItemChange - the highlighted item changed
 */
export class AbstractResourceList {
    @Input() caption = "Resources";
    @Input() items = [];
    @Input() types = [];
    @Input() options = {};
    @Input('selectedItem') set selectedItem(item) {
        if (this._selectedItem !== item) {
            this._selectedItem = item;
            this.selectedItemChange.emit(item);
        }
    }
    get selectedItem() { return this._selectedItem; }
    @Input('highlightedItem') set highlightedItem(item) {
        if (this._highlightedItem !== item) {
            this._highlightedItem = item;
            this.highlightedItemChange.emit(item);
            this.highlightService.highlight(this._highlightedItem);
        }
    }
    get highlightedItem() { return this._highlightedItem; }

    @Output() added = new EventEmitter();
    @Output() removed = new EventEmitter();
    @Output() updated = new EventEmitter();
    @Output() selectedItemChange = new EventEmitter();
    @Output() highlightedItemChange = new EventEmitter();

    _selectedItem;
    _highlightedItem;
    _openItem;

    zones = [];

    sortByMode = "unsorted";
    filterByMode = "Name";
    searchString = "";

    hs: Subscription;
    getClassLabel = getClassLabel;

    constructor(highlightService: HighlightService) {
        this.highlightService = highlightService;
        this.hs = this.highlightService.highlightedItemChanged$.subscribe(item => {
            if (this.items.includes(item) && this._highlightedItem !== item){
                this._highlightedItem = item;
            }
        })
    }

    ngOnInit() {
        if (!this.items) {
            this.items = [];
        }
        if (this.items[0] || !this.selectedItem) {
            this.selectedItem = this.items[0];
        }
        if (this.types.length === 0) {
            this.types = Object.keys(modelClassNames);
        }
        this.zones = this.types.map(x => x + "_zone");
    }

    ngOnDestroy() {
        if (this.hs) {
            this.hs.unsubscribe();
        }
    }

    unhighlight(item) {
        if (this.highlightedItem === item) {
            this.highlightedItem = null;
        }
    }

    //Open item
    set openItem(item){
        if (this._openItem !== item) {
            this._openItem = item;
        }
    }

    get openItem(){
        return this._openItem;
    }

    /* Events */

    onSorted(prop: string) {
        this.sortByMode = prop.toLowerCase();
    }

    onFiltered(config) {
        this.filterByMode = config.mode.toLowerCase();
        this.searchString = config.filter;
    }

    onSaved(item, updatedItem) {
        this.updated.emit(this.items);
        if (item === this.selectedItem) {
            this.selectedItemChange.emit(this.selectedItem);
        }
    }

    onRemoved(item) {
        if (!this.items) return;
        let index = this.items.indexOf(item);
        if (index > -1) this.items.splice(index, 1);
        if (item === this.selectedItem) {
            if (this.items.length > 0){
                this.selectedItem = this.items[0];
            }
            else {
                this.selectedItem = null;
            }
        }
        item.delete();
        this.removed.emit(item);
        this.updated.emit(this.items);
    }

    onAdded(clsName) {
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
