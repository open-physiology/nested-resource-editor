import {Input, Output, EventEmitter} from '@angular/core';
import {HighlightService} from './HighlightService.js';
import {ToastyService} from 'ng2-toasty';

/**
 * The AbstractResourceList class implements methods common for upper level and nested resource lists.
 */
export class AbstractResourceList {
    /**
     * @type {string} caption           - the header of the list
     */
    @Input() caption = "Resources";

    /**
     * A function that creates resources that are handled by model library
     */
    @Input() resourceFactory;

    /**
     * @type {Object} resourceClasses          - the open-physiology model
     */
    @Input() resourceClasses;

    /**
     * @type {Array<Resource>} items     - the list of displayed resources
     */
    @Input() items = [];

    /**
     * @type {Object} - visualization options
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
    _typeNames       = [];
    _sortByMode      = "unsorted";
    _filterByMode    = "Name";
    _searchString    = "";

    /**
     * The constructor of the component
     * @param {HighlightService} highlightService - the service that notifies nested components about currently highlighted item
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     */
    constructor(highlightService: HighlightService, toastyService: ToastyService) {
        this._highlightService = highlightService;
        this._toastyService = toastyService;
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
     * Choose a resource to show in the open editor
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
     * Event handler for the sorting mode change event
     * @param {string} prop - the sorting mode
     */
    _onSorted(prop) {
        this._sortByMode = prop.toLowerCase();
    }

    /**
     * Event handler for the filter change event
     * @param {Object} config - the parameters for filtering, mode and search string.
     */
    _onFiltered(config) {
        this._filterByMode = config.mode.toLowerCase();
        this._searchString = config.filter;
    }

    /**
     * Event handler for the 'save' ('commit') event
     * @param {Resource} item - the resource to save (commit)
     */
    _onSaved(item) {
        this.updated.emit(this.items);
        if (item === this.selectedItem) {
            this.selectedItemChange.emit(this.selectedItem);
        }
    }

    /**
     * Event handler for the 'delete' event
     * @param {Resource} item - he resource to delete
     */
    _onRemoved(item) {
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
     * Event handler for the 'create new resource' event
     * @param {string} clsName - the type of the resource to create
     */
    _onAdded(clsName) {
        let options = {};
        if (clsName === "LyphWithAxis") {
            clsName = this.resourceClasses.Lyph.name;
            options.createAxis = true;
        }
        if (clsName === this.resourceClasses.Lyph.name) {
            options.createRadialBorders = true;
        }

        let newItem;
        if (this.resourceFactory){
            newItem = this.resourceFactory(clsName, {name: `New ${clsName}`}, options);
            if (clsName === this.resourceClasses.Material.name) {
                let newType = this.resourceFactory(this.resourceClasses.Type.name,
                    {name: newItem.name, definition: newItem});
                newItem.p('name').subscribe(newType.p('name'));
            }
        } else {
            let cls = this.resourceClasses[clsName];
            newItem = cls.new({name: `New ${clsName}`}, options);
            if (clsName === this.resourceClasses.Material.name) {
                this.resourceClasses.Type.new({name: newItem.name, definition: newItem});
            }
            this._toastyService.error("The resource factory is not provided! The created resource is a placeholder!");
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
    _getClassLabel(clsName){
        if (!clsName) { return ""; }
        let label = clsName;
        label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
        label = label[0].toUpperCase() + label.substring(1).toLowerCase();
        return label;
    }

}
