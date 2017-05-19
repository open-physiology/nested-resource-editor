import {Input, Output, EventEmitter} from '@angular/core';
import {HighlightService} from './HighlightService.js';

/**
 * The AbstractResourceList class implements methods common for upper level and nested resource lists.
 */
export class AbstractResourceList {
    /**
     * @type {string} caption           - the header of the list
     */
    @Input() caption = "Resources";
    /**
     * @type {Object} model  - the open-physiology model
     */
    @Input() model;
    /**
     * @type {Array<Resource>} items    - the list of displayed resources
     */
    @Input() items = [];
    /**
     * @type {Array<string>} types      - the list of displayed item types (resource classes)
     */
    @Input() types = [];

    /**
     * @type {Object} - visualization options
     * @property {boolean} options.ordered -
     */
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
            this._highlightService.highlight(this._highlightedItem);
        }
    }
    get highlightedItem() { return this._highlightedItem; }

    /**
     * @emits added                 - a new item added to the list
     */
    @Output() added = new EventEmitter();
    /**
     * @emits removed               - an item removed from the list
     */
    @Output() removed = new EventEmitter();
    /**
     * @emits updated               - an item in the list has been updated
     */
    @Output() updated = new EventEmitter();
    /**
     * @emits selectedItemChange    - the selected item changed
     */
    @Output() selectedItemChange = new EventEmitter();
    /**
     * @emits highlightedItemChange - the highlighted item changed
     */
    @Output() highlightedItemChange = new EventEmitter();

    _selectedItem    = null;
    _highlightedItem = null;
    _openItem        = null;

    _zones = [];

    _sortByMode   = "unsorted";
    _filterByMode = "Name";
    _searchString = "";

    /**
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     */
    constructor(highlightService: HighlightService) {
        this._highlightService = highlightService;
        this._hs = this._highlightService.highlightedItemChanged$.subscribe(item => {
            if (this.items.includes(item) && this._highlightedItem !== item){
                this._highlightedItem = item;
            }
        })
    }

    /**
     * Initialize the nested resource list: choose selected item and default parameters (e.g., visible classes)
     */
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
        this._zones = this.types.map(x => x + "_zone");
    }

    /**
     * On component destroy, unsubscribe from model library data handling events
     */
    ngOnDestroy() {
        if (this._hs) {
            this._hs.unsubscribe();
        }
    }

    _unhighlight(item) {
        if (this.highlightedItem === item) {
            this.highlightedItem = null;
        }
    }

    /**
     * Set resource with the open editor
     * @param {Resource} item - the resource with the open editor
     */
    set openItem(item){
        if (this._openItem !== item) {
            this._openItem = item;
        }
    }

    /**
     * @returns {Resource} - the resource with the open editor
     */
    get openItem(){
        return this._openItem;
    }

    /* Event processing */

    /**
     * Change sorting mode
     * @param {string} prop - the sorting mode
     */
    onSorted(prop) {
        this._sortByMode = prop.toLowerCase();
    }

    /**
     * Change filter settings
     * @param {Object} config - the parameters for filtering, mode and search string.
     */
    onFiltered(config) {
        this._filterByMode = config.mode.toLowerCase();
        this._searchString = config.filter;
    }

    /**
     * Save (commit) a given resource
     * @param {Resource} item - the resource to save (commit)
     */
    onSaved(item) {
        this.updated.emit(this.items);
        if (item === this.selectedItem) {
            this.selectedItemChange.emit(this.selectedItem);
        }
    }

    /**
     * Delete a given resource
     * @param {Resource} item - he resource to delete
     */
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

    /**
     * Create new resource
     * @param {string} clsName - the type of the resource to create
     */
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
