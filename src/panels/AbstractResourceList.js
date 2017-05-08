import {Input, Output, EventEmitter} from '@angular/core';
import {Subscription}   from 'rxjs/Subscription';
import {HighlightService} from './HighlightService.js';

/**
 * The AbstractResourceList class implements methods common for upper level and nested resource lists.
 *
 * @param {string} caption           - the header of the list
 * @param {Object} model  - the open-physiology model
 * @param {Array<Resource>} items    - the list of displayed resources
 * @param {Array<string>} types      - the list of displayed item types (resource classes)
 * @param {Object} options           - an optional object with configuration options for the list appearance, i.e.,
 *   {headersOnly: false, readOnly: false, sortToolbar: true, filterToolbar: true, showActive: false}
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
    @Input() model;
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

    _selectedItem    = null;
    _highlightedItem = null;
    _openItem        = null;

    zones = [];

    sortByMode = "unsorted";
    filterByMode = "Name";
    searchString = "";
    hs: Subscription;

    constructor(highlightService: HighlightService) {
        this.highlightService = highlightService;
        this.hs = this.highlightService.highlightedItemChanged$.subscribe(item => {
            if (this.items.includes(item) && this._highlightedItem !== item){
                this._highlightedItem = item;
            }
        })
    }

    ngOnInit() {
        if (!this.items) { this.items = []; }

        if (this.items[0] || !this.selectedItem) {
            this.selectedItem = this.items[0];
        }

        if (this.types.length === 0) {
            //If no specific classes were specified, it works with any class
            let visualClasses = [...this.model.Artefact.allSubclasses()].map(x => x.name);
            for (let cls of Object.values(this.model)){
                if (cls.isResource && !cls.abstract && !visualClasses.includes(cls.name)){
                    this.types.push(cls.name);
                    if (cls.name === this.model.Lyph.name){ this.types.push("LyphWithAxis"); }
                }
            }
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
        if (clsName === "LyphWithAxis") {
            clsName = this.model.Lyph.name;
            options.createAxis = true;
        }
        if (clsName === this.model.Lyph.name) {
            options.createRadialBorders = true;
        }

        let newItem = this.model[clsName].new({name: `New ${clsName}`}, options);

        if (clsName === this.model.Material.name) {
            let newType = this.model.Type.new({name: newItem.name, definition: newItem});
            newItem.p('name').subscribe(newType.p('name'));
        }

        this.items.push(newItem);
        this.updated.emit(this.items);
        this.added.emit(newItem);
        this.selectedItem = newItem;
    }

    /**
     * The getClassLabel function provides an human readable label for open-physiology class
     * @param {Resource} clsName - the resource class name
     * @returns {string} - the human readable label
     */
    getClassLabel(clsName: string): string{
        if (!clsName) { return ""; }
        let label = clsName;
        label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
        label = label[0].toUpperCase() + label.substring(1).toLowerCase();
        return label;
    }

}
