import {NgModule, Component, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule}    from '@angular/common';
import {FormsModule}     from '@angular/forms';
import {AccordionModule} from "ngx-accordion";
import {DndModule}       from 'ngx-dnd';
import {ToastyModule, ToastyService} from 'ng2-toasty';
import '../../node_modules/ng2-toasty/style.css';
import '../../node_modules/ng2-toasty/style-bootstrap.css';


import {PipeTransformModule, SetToArray, HideClass}     from "../common/PipeTransformModule";
import {MeasurableGeneratorModule, MeasurableGenerator} from "../components/MeasurableGeneratorModule";
import {ToolbarSettingsModule} from '../common/toolbars/ToolbarSettingsModule';
import {CustomSelectModule}    from '../common/components/CustomSelectModule';
import {ToolbarAddModule}      from '../toolbars/ToolbarAddModule';
import {ToolbarFilterModule}   from '../toolbars/ToolbarFilterModule';
import {ToolbarSortModule}     from '../toolbars/ToolbarSortModule';
import {ItemHeader}            from "./ItemHeader";
import {NestedResourceList}    from './NestedResourceList';
import {ToolbarCommandsModule} from '../toolbars/ToolbarCommandsModule';
import {TemplateValueModule}   from '../components/TemplateValueModule';
import {HighlightService}      from './HighlightService.js';

@Component({
    selector: 'resource-panel',
    template:`
        <div class="panel">
            <div class="panel-body">
                <toolbar-commands
                        [options]="options"
                        (saved)="_onSaved($event)"
                        (canceled)="_onCanceled($event)"
                        (removed)="removed.emit($event)">
                    <button *ngIf="item.class === resourceClasses.Lyph.name"
                            type="button" class="btn btn-default btn-icon" (click)="_mGen.open()">
                        <span class="glyphicon glyphicon-cog"></span>
                    </button>
                </toolbar-commands>
                <!--<toolbar-sort [options]="['Name']" (sorted)="_onSorted($event)"></toolbar-sort>-->
                <toolbar-propertySettings
                        [options]="_fields"
                        [transform]="_getPropertyLabel"
                        (selectionChanged)="_visibleFieldsChanged($event)">
                </toolbar-propertySettings>

                <div class="input-control" *ngIf="!options?.hideCreateType && _isTyped()">
                    <input type="checkbox" [disabled]="_typeCreated" [(ngModel)]="_createType">Create type
                </div>

                <div class="panel-content">
                    <div class="input-control" *ngFor="let field of _fields | orderBy : _sortByMode">
                        <div *ngIf="!_ignore.has(field.value)">

                            <div class="input-control-lg" *ngIf="field.type === 'input'">
                                <label for="comment">{{_getPropertyLabel(field.value)}}: </label>
                                <input class="form-control"
                                       [type]     ="_getDefaultValue(field.value, 'type')"
                                       [disabled] ="item.constructor.properties[field.value].readOnly"
                                       [(ngModel)]="item[field.value]">
                            </div>

                            <div *ngIf="field.type === 'select'">
                                <label>{{_getPropertyLabel(field.value)}}: </label>
                                <select-input [items]   = "item.p(field.value) | async"
                                              [options] = "_possibleValues[field.value]"
                                              [placeholder] = "_getPlaceholder(field.value)"
                                              (updated) = "_updateProperty(field.value, $event)"
                                              [multiple]= "false"
                                >
                                </select-input>
                            </div>

                            <div *ngIf="field.type === 'multiSelect'">
                                <label>{{_getPropertyLabel(field.value)}}: </label>
                                <select-input [items]="item.p(field.value) | async"
                                              [placeholder] = "_getPlaceholder(field.value)"
                                              [options]="_possibleValues[field.value]">
                                </select-input>
                            </div>

                            <nested-resource-list *ngIf="field.type === 'relation'"
                                                  [caption]="_getPropertyLabel(field.value)"
                                                  [items]="item.p(field.value) | async | setToArray"
                                                  [resourceClasses]="resourceClasses"
                                                  [resourceFactory]="resourceFactory"
                                                  [options]="{ordered: ['layers', 'segments'].includes(field.value)}"
                                                  [type]="item.constructor.relationshipShortcuts[field.value].codomain.resourceClass"
                                                  (updated)="_updateProperty(field.value, $event)">
                            </nested-resource-list>

                            <template-value *ngIf="field.type === 'template'"
                                            [caption]="_getPropertyLabel(field.value)"
                                            [item]="item.p(field.value) | async"
                                            [step]="_getDefaultValue(field.value, 'step')"
                                            (updated)="_updateProperty(field.value, $event)">
                            </template-value>

                            <fieldset *ngIf="field.type === 'checkbox'">
                                <legend>{{_getPropertyLabel(field.value)}}:</legend>
                                <p *ngFor="let option of _possibleValues[field.value]; let i = index">
                                    <input type="checkbox"
                                           [value]="option"
                                           [checked]="item[field.value].includes(option)"
                                           (change)="_updateArray(field.value, option, $event)"
                                    >{{option}}&nbsp;
                                </p>
                            </fieldset>
                        </div>
                    </div>

                    <modal-window *ngIf="item.class === resourceClasses.Lyph.name"
                                  [item]="item"
                                  [resourceClasses]="resourceClasses"
                                  [resourceFactory]="resourceFactory">
                    </modal-window>

                </div>
            </div>
        </div>
        <ng2-toasty></ng2-toasty>
    `,
    styles: [
        `
        input[type=number] {
          text-align:right;
        }
        .panel-content{
          border: 1px solid #ccc;
        }
        :host >>> .input-control {
          margin-left: 4px;
          padding: 2px;
          display: inline-block;
          vertical-align:top;
        }
        :host >>> .input-control >>> label {
          display: block;
        }
        :host >>> .input-control-sm {
          width: 68px;
        }
        :host >>> .input-control-md {
          width: 124px;
        }
        :host >>> .input-control-lg {
          width: 178px;
        }
        :host >>> fieldset {
          border: 1px ridge #e3e3e3;
          padding: 4px;
          margin: 4px;
        }
        legend{
          font: inherit;
          font-weight: bold;
          padding: 4px;
          margin-bottom: 0;
          border: 0;
          width: auto;
        }
        :host >>> .form-control {
          height: 30px;
          box-shadow: none!important;
            
        }
        :host >>> .form-control:focus {
          border: 2px solid #ccc;
          box-shadow: none!important;
        }
        :host >>> .dropdown-menu  {
          position: relative !important;
        }
        `
    ]
})
/**
 * The ResourcePanel component, generates fields for editting properties of a given resource.
 */
export class ResourcePanel {
    /**
     * @property {Resource} item - the resource to show or edit
     */
    @Input() item;
    /**
     * @property {Object} options - the visualization options for the panel's commands toolbar
     */
    @Input() options;

    /**
     * A function that creates resources that are handled by model library
     */
    @Input() resourceFactory;
    /**
     * Resource classes
     */
    @Input() resourceClasses;

    /**
     * @emits saved           - the changes saved
     */
    @Output() saved = new EventEmitter();
    /**
     * @emits canceled        - the changes canceled
     */
    @Output() canceled = new EventEmitter();
    /**
     * @emits removed         - the item deleted
     */
    @Output() removed = new EventEmitter();

    @ViewChild(MeasurableGenerator) _mGen;
    _sortByMode = "unsorted";
    _ignore = new Set();

    //Field type and visibility configurations
    _fields = [];
    //Typed resources
    _createType = false;
    _typeCreated = false;
    //Selection options
    _possibleValues = {};

    /**
     * The constructor of the component
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     */
    constructor(toastyService: ToastyService){
        this._toastyService = toastyService;
    }

    /**
     * Initialize the component: define visual element type for each property field
     */
    ngOnInit(){
        this._ignore = new Set(["id", "cardinalityBase", "cardinalityMultipliers", "definedType"]);
        if (this.item instanceof this.resourceClasses.Border) {
            ['externals', 'species', 'measurables', 'name', 'types', 'nodes'].map(propName =>
                this._ignore.add(propName));
        }

        /*Auto-generated visual groups*/
        let privateProperties = new Set(["class", "themes", "parents", "children", "borders"]);
        let multiSelectProperties = [
            'externals', 'subtypes', 'supertypes', 'clinicalIndices', 'correlations',
            'cardinalityMultipliers', 'types', 'materials', 'locations', 'causes', 'effects'];
        let templateGroup = ['thickness', 'length', 'cardinalityBase']; //TODO: override to use schema
        /*Description of visible fields*/

        /*Properties*/
        for (let [key, value] of Object.entries(this.item.constructor.properties)
                .filter(([key, value]) => !privateProperties.has(key))){
            this._fields.push({
                value: key,
                selected: !this._ignore.has(key),
                type: (value.items && value.items.enum)? 'checkbox'
                    : (templateGroup.includes(key))? 'template': 'input'
            });
            if (value.items && value.items.enum){
                this._possibleValues[key] = Object.values(value.items.enum);
            }
        }
        /*Relationships*/
        for (let [key, value] of Object.entries(this.item.constructor.relationshipShortcuts)
                .filter(([key, value]) => !privateProperties.has(key) && !value.abstract)){
            this._fields.push({
                value: key,
                selected: !this._ignore.has(key),
                type: (value.cardinality.max === 1)
                    ? 'select'
                    : multiSelectProperties.includes(key)? 'multiSelect' : 'relation'
                });

            this.item.fields[key].p('possibleValues').subscribe(
                (data) => {
                    this._possibleValues[key] = (key === "cardinalityMultipliers")?
                        new Set(new HideClass().transform( new SetToArray().transform(data),
                            [this.resourceClasses.Border.name, this.resourceClasses.Node.name]))
                        : data;
                });
      }

      /*"create type" check box enabled if type has not been defined */
      if (this._isTyped()){ this._typeCreated = !!this.item['-->DefinesType']; }

    }

    /**
     * The getPropertyLabel function replaces field name with human readable labels
     * @param {string} option - the open-physiology resource field name
     * @returns {string} - the user readable label
     */
    _getPropertyLabel(option, uppercase = true){
        let custom = { "externals": "Annotations",
            "locals": "Local resources" };
        if (custom[option]) { return custom[option]; }

        if (["id", "uri"].includes(option)) {
            return option.toUpperCase();
        }

        let label = option.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (uppercase){
            label = label[0].toUpperCase() + label.substring(1).toLowerCase();
        }
        return label;
    }

    _getPlaceholder(option){
        return "Select " + this._getPropertyLabel(option, false);
    }

    /**
     * @param {string} property  - the resource property name
     * @param {string} attribute - the visual attribute name that needs the default value
     * @returns {any}            - the initial (default) value for the visual attribute of the resource property
     *
     * @example getDefaultValue("width", "step") = 1
     */
    _getDefaultValue(property, attribute){
        let propertySpec = this.item.constructor.properties[property];
        switch(attribute){
            case "type": return ((propertySpec.type === "integer")
            || (propertySpec.type === "number"))? "number": "text";
            case "step": return (propertySpec.type === "number")? 0.1: 1;
        }
        return "";
    }

    _visibleFieldsChanged(option){
        if ( this._ignore.has(option.value) &&  option.selected) {
            this._ignore.delete(option.value);
        }
        if (!this._ignore.has(option.value) && !option.selected) {
            this._ignore.add(option.value);
        }
    }

    _updateProperty(property, item){
        if (!(this.item.fields[property] && this.item.fields[property].readonly)) {
            this.item[property] = item;
        } else {
            this._toastyService.error("Cannot update read only field!");
        }
    }

    _updateArray(property, option, event){
        let newArray = [];
        if (!event.target.checked){
            newArray = this.item[property].filter(x => x !== option);
        } else {
            newArray = this.item[property].slice();
            if (!newArray.includes(option)){
                newArray.push(option);
            }
        }
        this._updateProperty(property, newArray);
    }

    _isTyped(){
        return this.item instanceof this.resourceClasses.Template;
    }

    _onSorted(prop) {
        if (prop === "Name"){
            this._sortByMode = "value";
        } else {
            this._sortByMode = prop.toLowerCase();
        }
    }

    async _onSaved(event){
        if (this.item.class === this.resourceClasses.CoalescenceScenario.name){
            if (this.item.lyphs && (this.item.lyphs.size !== 2)){
                this._toastyService.error("Wrong number of lyphs", this.item.lyphs.size);
            }
        }

        try{
            await this.item.commit();
            if (event && event._createType){
                let template = this.item;
                if (!template['-->DefinesType']){
                    let newType = this.resourceClasses.Type.new({definition: template});
                    template.p('name').subscribe(newType.p('name'));
                    await newType.commit();
                }
            }
        } catch (reason){
            let errorMsg = "Failed to commit resource!\n" + reason;
            this._toastyService.error(errorMsg);
            console.error(reason);
        }

        this.saved.emit(this.item);
    }

    _onCanceled(event) {
        this.item.rollback();
        this.canceled.emit(event);
    }
}

/**
 * The ResourcePanelModule module, exports ResourcePanel component, toolbar modules and pipes.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DndModule.forRoot(),
        ToastyModule.forRoot(),
        AccordionModule,
        ToolbarSettingsModule,
        ToolbarCommandsModule,
        ToolbarAddModule,
        ToolbarFilterModule,
        ToolbarSortModule,
        TemplateValueModule,
        PipeTransformModule,
        CustomSelectModule,
        MeasurableGeneratorModule],
    declarations: [ ResourcePanel, NestedResourceList, ItemHeader ],
    providers:    [ HighlightService, ToastyService ],
    exports: [
        AccordionModule,
        DndModule,
        PipeTransformModule,
        ToolbarSettingsModule,
        ToolbarAddModule,
        ToolbarFilterModule,
        ToolbarSortModule,
        ResourcePanel,
        ItemHeader
    ]
})
export class ResourcePanelModule {}
