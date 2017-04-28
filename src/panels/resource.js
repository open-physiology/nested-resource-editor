/**
 * Created by Natallia on 4/18/2017.
 */
import {Component, ViewChild, EventEmitter, Input, Output} from '@angular/core';

//Common
import {SetToArray} from "../common/pipes";
import {model, getPropertyLabel} from "../common/utils";
import {ModalWindow} from "../components/modal";

@Component({
    selector: 'resource-panel',
    template:`
    <div class="panel">
        <div class="panel-body">
          <toolbar-commands  
            [options]  = "options"
            (saved)    = "onSaved(event)"
            (canceled) = "onCanceled(event)"
            (removed)  = "removed.emit($event)">            
          </toolbar-commands>
          <toolbar-propertySettings  
            [options] = "fieldOptions"
            [transform] = "getPropertyLabel"
            (selectionChanged) = "visibleFieldsChanged($event)">
          </toolbar-propertySettings>
          <div *ngIf="!options?.hideCreateType && isTyped()" >
            <input type="checkbox" [disabled]="typeCreated" [(ngModel)]="createType">Create type
          </div>
          <div *ngIf="item.class === model.Lyph.name">
            <button type="button" class="btn btn-default btn-icon" 
              (click)="generateMeasurables()">
              <span class="glyphicon glyphicon-cog"></span>
            </button>
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
                  [items]  ="item.p(property) | async | setToArray" 
                  [types]  ="[item.constructor.relationshipShortcuts[property].codomain.resourceClass]"
                  (updated)="updateProperty(property, $event)" 
                  (highlightedItemChange)="highlightedItemChange.emit($event)">
                </nested-resource-list>
              
                <template-value *ngIf="templateGroup.includes(property)" 
                  [caption]="getPropertyLabel(property)" 
                  [item]="item.p(property) | async"
                  [step]="getDefaultValue(property, 'step')"
                  (updated)="updateProperty(property, $event)">
                </template-value>
                
                <fieldset *ngIf="checkboxGroup.includes(property)">
                  <legend>{{getPropertyLabel(property)}}:</legend>
                  <p *ngFor = "let option of possibleValues[property]"
                    [(ngModel)]="item[property]" (ngModelChange)="updateArray(property, item[property])">
                     <input type="checkbox" [value]="option">{{option}}&nbsp;
                  </p>
                </fieldset>
              </div>
            </div>
            
            <modal-window *ngIf = "item.class === model.Lyph.name" [item] = item>
            </modal-window>
            
          </div>
        </div>
    </div>
    <!--<ng2-toasty></ng2-toasty>-->
  `
})
export class ResourcePanel {
    @Input() item: any;
    @Input() options: any;

    @Output() saved = new EventEmitter();
    @Output() canceled = new EventEmitter();
    @Output() removed = new EventEmitter();
    @Output() propertyUpdated = new EventEmitter();
    @Output() highlightedItemChange = new EventEmitter();

    getPropertyLabel = getPropertyLabel;
    model = model;

    @ViewChild(ModalWindow) mGen: ModalWindow;

    ignore: Set<string> = new Set();

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

    constructor(/*toastyService:ToastyService*/){
        //console.log("ToastyModule", ToastyModule);
        //console.log("toastyService", toastyService);
    }

    ngOnInit(){
        this.ignore = new Set(["id", "cardinalityBase", "cardinalityMultipliers", "definedType"]);
        if (this.item instanceof model.Border){
            this.ignore = this.ignore.add('externals').add('species').add('measurables').add('name').add('types').add('nodes');
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
                        new Set(new HideClass().transform( new SetToArray().transform(data), [model.Border.name, model.Node.name]))
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

    getDefaultValue(property, attribute): any{
        let propertySpec = this.item.constructor.properties[property];
        switch(attribute){
            case "type": return ((propertySpec.type === "integer") || (propertySpec.type === "number"))? "number": "text";
            case "step": return (propertySpec.type === "number")? 0.1: 1;
        }
        return "";
    }

    visibleFieldsChanged(option){
        if ( this.ignore.has(option.value) &&  option.selected) this.ignore.delete(option.value);
        if (!this.ignore.has(option.value) && !option.selected) this.ignore.add(option.value);
    }

    updateProperty(property, item){
        if (this.item.fields[property] && this.item.fields[property].readonly) { return; }
        this.item[property] = item;
        this.propertyUpdated.emit({property: property, values: item});
    }

    updateArray(property, value){
        let newArray = (Array.isArray(value))? value.slice(): value;
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
        return this.item instanceof model.Template;
    }

    generateMeasurables(){
        this.mGen.generateMeasurables();
    }

    onSaved(event){
        if (this.item.class === model.CoalescenceScenario.name){
            if (this.item.lyphs && (this.item.lyphs.size !== 2)){
                console.log("Wrong number of lyphs", this.item.lyphs.size);
            }
        }

        this.item.commit()
            .catch(reason => {
                let errorMsg = "Failed to commit resource: Relationship constraints violated! \n" +
                    "See browser console (Ctrl+Shift+J) for technical details.";
                //this.toastyService.error(errorMsg);
                console.log(reason);
            });

        if (event.createType){
            let template = this.item;
            if (!template['-->DefinesType']){
                (async function() {
                    let newType = model.Type.new({definition: template});
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
