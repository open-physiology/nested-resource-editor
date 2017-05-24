import {NgModule, Component, Input, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import isUndefined from 'lodash-bound/isUndefined';

@Component({
    "inputs": ["caption", "item", "min", "max", "step"],
    "selector": "template-value",
    "template": `
        <div class="input-control input-control-lg">
            <label for="caption">{{caption}}:</label>

            <div class="btn-group" style="float: left;">
                <button type="button" class="btn btn-default btn-icon"
                        [ngClass]="{'active': item.class === 'Number'}" (click)="_updateValue('Number')">
                    <span class="glyphicon glyphicon-th"></span>
                </button>
                <button type="button" class="btn btn-default btn-icon"
                        [ngClass]="{'active': item.class === 'NumberRange'}" (click)="_updateValue('NumberRange')">
                    <span class="glyphicon glyphicon-transfer"></span>
                </button>
                <button type="button" class="btn btn-default btn-icon"
                        [ngClass]="{'active': item.class === 'BoundedNormalDistribution'}"
                        (click)="_updateValue('BoundedNormalDistribution')">
                    <span class="glyphicon glyphicon-stats"></span>
                </button>
                <button type="button" class="btn btn-default btn-icon"
                        [ngClass]="{'active': item.class === 'UniformDistribution'}"
                        (click)="_updateValue('UniformDistribution')">
                    <span class="glyphicon glyphicon-align-center"></span>
                </button>
            </div>
        </div>

        <div class="input-control input-control-md" *ngIf="item.class === 'Number'">
            <label>Value:</label>
            <input type="number" class="form-control"
                   [min]="min"
                   [max]="max"
                   [step]="step"
                   [(ngModel)]="item.value"
                   (ngModelChange)="updated.emit(item)"/>
        </div>

        <div class="input-control" *ngIf="(item.class === 'NumberRange') || (item.class.endsWith('Distribution'))">
            <label>{{_getLabel()}}:</label>
            <fieldset>
                <div class="input-control input-control-sm">
                    <label for="min">Min: </label>
                    <input type="number" class="form-control"
                           [min]="min"
                           [max]="max"
                           [step]="step"
                           [(ngModel)]="item.min"
                           (ngModelChange)="updated.emit(item)">
                </div>
                <!--Max-->
                <div class="input-control input-control-sm">
                    <label for="max">Max: </label>
                    <input type="number" class="form-control"
                           [min]="min"
                           [max]="max"
                           [step]="step"
                           [(ngModel)]="item.max"
                           (ngModelChange)="updated.emit(item)">
                </div>
                <div *ngIf="item.class === 'BoundedNormalDistribution'" style="display: inline-block">
                    <!--Mean-->
                    <div class="input-control input-control-sm">
                        <label for="mean">Mean: </label>
                        <input type="number" class="form-control"
                               [min]="min"
                               [max]="max"
                               [step]="step"
                               [(ngModel)]="item.mean"
                               (ngModelChange)="updated.emit(item)">
                    </div>
                    <!--Std-->
                    <div class="input-control input-control-sm">
                        <label for="std">Std: </label>
                        <input type="number" class="form-control"
                               [min]="min"
                               [max]="max"
                               [step]="step"
                               [(ngModel)]="item.std"
                               (ngModelChange)="updated.emit(item)">
                    </div>
                </div>
            </fieldset>
        </div>
    `,
    "styles": [`
        input {width: 60px;}
        .form-control {
          height: 30px;
          box-shadow: none!important;
        }
        .form-control:focus  {
          border: 2px solid #ccc;
          box-shadow: none!important;
        }

    `],
})
/**
 * The TemplateValueComponent, provides fields for editing typedDistribution schema
 */
export class TemplateValueComponent{
    /**
     * @property {Object} item - the object specifying a value, range or distribution:
     * { 'value': { type: 'number' },
     *   'min':   { type: 'number' },
     *   'max':   { type: 'number' },
     *   'mean':  { type: 'number' },
     *   'std':   { type: 'number' },
     *   'class': { type: 'string', required: true }
     *    Class values: 'UniformDistribution' | 'BoundedNormalDistribution' | 'Number' | 'NumberRange'
     */
    @Input() item = {value: 0, class: 'Number'};
    /**
     * @property {number} min - the default value of the field "min"
     */
    @Input() min = 0;
    /**
     * @property {number} max - the default value of the field "max"
     */
    @Input() max = 10;
    /**
     * @property {number} step - the default value of the field "step"
     */
    @Input() step: number = 1;

    /**
     * The event signalling that the object has been changed
     * @type {EventEmitter}
     */
    @Output() updated = new EventEmitter();

    /**
     * Initialize the component
     */
    ngOnInit(){
        if (this.item::isUndefined()){
            this.item = {value: 0, class: 'Number'};
        }
        if (this.item.class::isUndefined()){
            this.item.class = 'Number';
        }
    }

    _updateValue(type){
        this.item.class = type;
        this.updated.emit(this.item);
    }

    _getLabel(){
        return
            (this.item.class === 'NumberRange')? 'Range':
            (this.item.class === 'BoundedNormalDistribution')
                ? 'Bounded normal distribution'
                : 'Uniform distribution';
    }

}

/**
 * The TemplateValueModule module, offers the TemplateValueComponent component.
 */
@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ TemplateValueComponent ],
    exports: [ TemplateValueComponent ]
})
export class TemplateValueModule {}
