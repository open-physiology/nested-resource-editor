import {NgModule, Component, ViewChild, EventEmitter, Input, Output, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AccordionModule} from "ngx-accordion";
import {DndModule} from 'ngx-dnd';

import {ToastyModule, ToastyService} from 'ng2-toasty';
import '../../node_modules/ng2-toasty/style.css';
import '../../node_modules/ng2-toasty/style-bootstrap.css';

//Common
import {PipeTransformModule, SetToArray, HideClass} from "../common/PipeTransformModule";
import {ToolbarSettingsModule} from '../common/toolbars/ToolbarSettingsModule';
import {CustomSelectModule} from '../common/components/CustomSelectModule';

//Local
import {ToolbarAddModule}      from '../toolbars/ToolbarAddModule';
import {ToolbarFilterModule}   from '../toolbars/ToolbarFilterModule';
import {ToolbarSortModule}     from '../toolbars/ToolbarSortModule';
import {ItemHeader}            from "./ItemHeader";
import {NestedResourceList}    from './NestedResourceList';
import {ToolbarCommandsModule} from '../toolbars/ToolbarCommandsModule';
import {TemplateValueModule}   from '../components/TemplateValueModule';
import {MeasurableGeneratorModule, MeasurableGenerator} from "../components/MeasurableGeneratorModule";

@Component({
    selector: 'resource-panel',
    template:`
    <div class="panel">
        <div class="panel-body">
          <toolbar-commands  
            [options]  = "options"
            (saved)    = "onSaved($event)"
            (canceled) = "onCanceled($event)"
            (removed)  = "removed.emit($event)">            
          </toolbar-commands>
          <toolbar-propertySettings  
            [options] = "fieldOptions"
            [transform] = "getPropertyLabel"
            (selectionChanged) = "visibleFieldsChanged($event)">
          </toolbar-propertySettings>
          <div class="input-control" *ngIf="item.class === model.Lyph.name">
            <button type="button" class="btn btn-default btn-icon" 
              (click)="generateMeasurables()">
              <span class="glyphicon glyphicon-cog"></span>
            </button>
          </div>
          <div class="input-control" *ngIf="!options?.hideCreateType && isTyped()" >
            <input type="checkbox" [disabled]="typeCreated" [(ngModel)]="createType">Create type
          </div>
                    
          <div class="panel-content"> 
            <div class="input-control" *ngFor="let property of fieldNames">
              <div *ngIf="!ignore.has(property)">

                <div class="input-control-lg" *ngIf="inputGroup.includes(property)">
                  <label for="comment">{{getPropertyLabel(property)}}: </label>
                  <input class="form-control" 
                    [type]="getDefaultValue(property, 'type')" 
                    [disabled]="item.constructor.properties[property].readOnly"
                    [(ngModel)]="item[property]">
                </div>
              
                <div *ngIf="selectGroup.includes(property)">      
                  <label>{{getPropertyLabel(property)}}: </label>
                  <select-input-1 [item] = "item.p(property) | async" 
                    (updated) = "updateProperty(property, $event)"  
                    [options] = "possibleValues[property]">
                  </select-input-1>
                </div>
                
                <div *ngIf="multiSelectGroup.includes(property)">
                    <label>{{getPropertyLabel(property)}}: </label>
                    <select-input [items] = "item.p(property) | async"
                     (updated) = "updateProperty(property, $event)"    
                     [options] = "possibleValues[property]">
                    </select-input>
                </div>
                
                <nested-resource-list *ngIf="relationGroup.includes(property)"
                  [caption]="getPropertyLabel(property)" 
                  [model]  ="model"
                  [items]  ="item.p(property) | async | setToArray" 
                  [types]  ="[item.constructor.relationshipShortcuts[property].codomain.resourceClass.name]"
                  (updated)="updateProperty(property, $event)"> 
                </nested-resource-list>
              
                <template-value *ngIf="templateGroup.includes(property)" 
                  [caption]="getPropertyLabel(property)" 
                  [item]   ="item.p(property) | async"
                  [step]   ="getDefaultValue(property, 'step')"
                  (updated)="updateProperty(property, $event)">
                </template-value>
                
                <fieldset *ngIf="checkboxGroup.includes(property)">
                  <legend>{{getPropertyLabel(property)}}:</legend>
                  <p *ngFor = "let option of possibleValues[property]; let i = index">
                     <input type="checkbox" [value]="option" 
                        [checked]="item[property].includes(option)" 
                        (change)="updateArray(property, option, $event)"
                     >{{option}}&nbsp;
                  </p>
                </fieldset>
              </div>
            </div>
            
            <modal-window *ngIf = "item.class === model.Lyph.name" [item] = "item" [clsMeasurable] = "model.Measurable">
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
    `]
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
     * @property {Object} model  - the open-physiology model
     */
    @Input() model;
    /**
     * @property {Object} options - the visualization options for the panel's commands toolbar
     */
    @Input() options;

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
    /**
     * @emits propertyUpdated - the item property changed
     */
    @Output() propertyUpdated = new EventEmitter();

    @ViewChild(MeasurableGenerator) _mGen;

    ignore           = new Set();

    fieldNames       = [];  //All fields
    fieldOptions     = [];  //Field visibility configurations

    checkboxGroup    = [];  //Properties in check-boxes
    templateGroup    = [];  //Properties in value-range-distribution component
    inputGroup       = [];  //Properties in input fields

    selectGroup      = [];  //Relationships with max cardinality-1 in combo list
    multiSelectGroup = [];  //Relationships in multi-combo lists
    relationGroup    = [];  //Relationships in nested resource lists

    /*Typed resources*/
    createType = false;
    typeCreated = false;

    /*Selection options*/
    possibleValues = {};

    /**
     * @param {ToastyService} toastyService - the service for showing notifications and error messages
     */
    constructor(toastyService:ToastyService){}

    ngOnInit(){
        this.ignore = new Set(["id", "cardinalityBase", "cardinalityMultipliers", "definedType"]);
        if (this.item instanceof this.model.Border) {
            ['externals', 'species', 'measurables', 'name', 'types', 'nodes'].map(propName =>
                this.ignore.add(propName));
        }

        /*Auto-generated visual groups*/
        let privateProperties = new Set(["class", "themes", "parents", "children"]);

        let fields = Object.assign({}, this.item.constructor.properties, this.item.constructor.relationshipShortcuts);
        this.fieldNames = Object.keys(fields).filter(p => !privateProperties.has(p));
        this.fieldOptions = this.fieldNames.map(field => ({value: field, selected: !this.ignore.has(field)}));

        /*Properties in check-boxes*/
        this.checkboxGroup = ['transportPhenomenon', 'nature'].filter(key => this.item.constructor.properties[key]);

        /*Properties in value-range-distribution forms */
        this.templateGroup = ['cardinalityBase', 'thickness', 'length'].filter(key => this.item.constructor.properties[key]);

        /*Properties in input fields*/
        this.inputGroup = Object.keys(this.item.constructor.properties)
            .filter(key => !privateProperties.has(key)
            && !this.checkboxGroup.includes(key)
            && !this.templateGroup.includes(key));

        /*Relationships*/
        let relationships = Object.entries(this.item.constructor.relationshipShortcuts)
            .filter(([key, value]) => !value.abstract && !privateProperties.has(key));

        //Filtered possible values for relationships
        for (let [key, value] of relationships){
            this.item.fields[key].p('possibleValues') .subscribe(
                (data) => {
                    this.possibleValues[key] = (key === "cardinalityMultipliers")?
                        new Set(new HideClass().transform( new SetToArray().transform(data),
                            [this.model.Border.name, this.model.Node.name]))
                        : data;
                });
        }

        //Possible values for enumerations
        for (let [key, propertySpec] of Object.entries(this.item.constructor.properties)){
            if (propertySpec.items && propertySpec.items.enum){
                this.checkboxGroup.push(key);
                this.possibleValues[key] = Object.values(propertySpec.items.enum);
            } else {
                this.possibleValues[key] = [];
            }
        }

        let multiSelectProperties = new Set([
            'externals', 'subtypes', 'supertypes', 'clinicalIndices', 'correlations',
            'cardinalityMultipliers', 'types', 'materials', 'locations', 'causes','effects']);

        /*Relationships in nested lists*/
        this.relationGroup = relationships.filter(x =>
            ((x[1].cardinality.max !== 1) && !multiSelectProperties.has(x[0]))).map(x => x[0]);

        /*Relationships in multi-select combo lists*/
        this.multiSelectGroup = relationships.filter(x =>
            ((x[1].cardinality.max !== 1) && multiSelectProperties.has(x[0]))).map(x => x[0]);

        //Relationships in single-select combo lists*/
        this.selectGroup = relationships.filter(x => (x[1].cardinality.max === 1)).map(x => x[0]);

        /*"create type" check box enabled if type has not been defined */
        if (this.isTyped()){ this.typeCreated = !!this.item['-->DefinesType']; }
    }

    /**
     * The getPropertyLabel function replaces field name with human readable labels
     * @param {string} option - the open-physiology resource field name
     * @returns {string} - the user readable label
     */
    getPropertyLabel(option: string): string{
        let custom = { "externals": "Annotations",
            "locals": "Local resources" };
        if (custom[option]) { return custom[option]; }

        if (["id", "uri"].includes(option)) {
            return option.toUpperCase();
        }

        let label = option.replace(/([a-z])([A-Z])/g, '$1 $2');
        label = label[0].toUpperCase() + label.substring(1).toLowerCase();
        return label;
    }

    /**
     * @param {string} property  - the resource property name
     * @param {string} attribute - the visual attribute name that needs the default value
     * @returns {any}            - the initial (default) value for the visual attribute of the resource property
     *
     * @example getDefaultValue("width", "step") = 1
     */
    getDefaultValue(property, attribute){
        let propertySpec = this.item.constructor.properties[property];
        switch(attribute){
            case "type": return ((propertySpec.type === "integer")
            || (propertySpec.type === "number"))? "number": "text";
            case "step": return (propertySpec.type === "number")? 0.1: 1;
        }
        return "";
    }

    visibleFieldsChanged(option){
        if ( this.ignore.has(option.value) &&  option.selected) {
            this.ignore.delete(option.value);
        }
        if (!this.ignore.has(option.value) && !option.selected) {
            this.ignore.add(option.value);
        }
    }

    updateProperty(property, item){
        if (this.item.fields[property] && this.item.fields[property].readonly) { return; }
        this.item[property] = item;
        this.propertyUpdated.emit({property: property, values: item});
    }

    updateArray(property, option, event){
        let newArray = [];
        if (!event.target.checked){
            newArray = this.item[property].filter(x => x !== option);
        } else {
            newArray = this.item[property].slice();
            if (!newArray.includes(option)){
                newArray.push(option);
            }
        }
        this.updateProperty(property, newArray);
    }

    addItem(parent, property, item){
        if (parent && (parent[property])){
            parent[property].add(item);
            this.propertyUpdated.emit({property: property, values: parent[property]});
        }
    }

    removeItem(parent, property, item){
        item.delete();
        this.updateProperty(property, parent[property]);
    }

    isTyped(){
        return this.item instanceof this.model.Template;
    }

    generateMeasurables(){
        this._mGen.generateMeasurables();
    }

    onSaved(event){
        if (this.item.class === this.model.CoalescenceScenario.name){
            if (this.item.lyphs && (this.item.lyphs.size !== 2)){
                this.toastyService.error("Wrong number of lyphs", this.item.lyphs.size);
            }
        }

        this.item.commit()
            .catch(reason => {
                let errorMsg = "Failed to commit resource: Relationship constraints violated! \n" + reason;
                this.toastyService.error(errorMsg);
            });

        if (event && event.createType){
            let template = this.item;
            if (!template['-->DefinesType']){
                (async function() {
                    let newType = this.model.Type.new({definition: template});
                    template.p('name').subscribe(newType.p('name'));

                    await newType.commit();
                })();
            }
        }

        this.saved.emit(this.item);
    }

    onCanceled(event) {
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
        AccordionModule,
        ToolbarSettingsModule,
        ToolbarCommandsModule,
        ToolbarAddModule,
        ToolbarFilterModule,
        ToolbarSortModule,
        TemplateValueModule,
        PipeTransformModule,
        CustomSelectModule,
        ToastyModule.forRoot(),
        MeasurableGeneratorModule],
    declarations: [ ResourcePanel, NestedResourceList, ItemHeader ],
    providers: [ToastyService],
    exports: [
        //Existing
        AccordionModule,
        DndModule,
        PipeTransformModule,
        ToolbarSettingsModule,
        ToolbarAddModule,
        ToolbarFilterModule,
        ToolbarSortModule,
        //New
        ResourcePanel,
        ItemHeader]
})
export class ResourcePanelModule {}
