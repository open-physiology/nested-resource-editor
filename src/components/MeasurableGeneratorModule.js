import {NgModule, Component, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import '../libs/jquery';

import {Ng2Bs3ModalModule, ModalComponent} from '../libs/ng2-bs3-modal';

@Component({
    selector: 'modal-window',
    template:`
        <modal #myModal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Select supertype measurables to replicate</h4>
            </modal-header>
            <modal-body>
                <li *ngFor="let option of _supertypeMeasurables; let i = index">
                    <a class="small" href="#">
                        <input type="checkbox"
                               [(ngModel)]="option.selected"
                               (ngModelChange)="_updateValue(option)"/>&nbsp;
                        {{option.value.name}}</a>
                </li>
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" (click)="close($event)">Ok</button>
            </modal-footer>
        </modal>
    `
})
/**
 * MeasurableGenerator component, provides generation of measurables in a pop-up window.
 *
 * @param {Resource} item - a resource, typically, lyph, which inherits measurables from its type
 * @param {Object} clsMeasurable - the Measurable resource class to create new measurables
 * @emits closed - a user closed the modal window
 *
 */
export class MeasurableGenerator{
    @Input()  item;
    @Input()  clsMeasurable;
    @Output() closed = new EventEmitter();

    //Measurable replication
    _supertypeMeasurables   = [];
    _measurablesToReplicate = new Set();

    @ViewChild('myModal')
    modal: ModalComponent;

    /**
     * Open the modal window with pre-filled measurables of lyph supertypes
     */
    open() {
        let allSupertypeMeasurables = [];
        for (let type of this.item.types) {
            for (let supertype of type.supertypes) {
                if (supertype.definition && supertype.definition.measurables) {
                    let supertypeMeasurables = Array.from(new Set(supertype.definition.measurables.map((item) => item.type)));
                    for (let supertypeMeasurable of supertypeMeasurables) {
                        if (allSupertypeMeasurables.indexOf(supertypeMeasurable) < 0)
                            allSupertypeMeasurables.push(supertypeMeasurable);
                    }
                }
            }
        }
        this._supertypeMeasurables = allSupertypeMeasurables.map(x => {
            return {value: x, selected: this._measurablesToReplicate.has(x)}
        });
        this.modal.open();
    }

    /**
     * Close the modal window
     * @param event - the event object
     */
    close(event) {
        if (this._measurablesToReplicate.size > 0){
            let protoMeasurables = Array.from(this._measurablesToReplicate);
            for (let protoMeasurable of protoMeasurables){
                let newMeasurable = this.clsMeasurable.new(protoMeasurable);
                newMeasurable.location = this.item;
            }
        }
        this.modal.close();
        this.closed.emit(event);
    }

    _updateValue(option){
        if ( this._measurablesToReplicate.has(option.value) && !option.selected)
            this._measurablesToReplicate.delete(option.value);
        if (!this._measurablesToReplicate.has(option.value) && option.selected)
            this._measurablesToReplicate.add(option.value);
    }
}

/**
 * The MeasurableGeneratorModule module, offers the MeasurableGenerator component.
 */
@NgModule({
    imports: [ CommonModule, FormsModule, Ng2Bs3ModalModule],
    declarations: [ MeasurableGenerator ],
    exports: [ MeasurableGenerator ]
})
export class MeasurableGeneratorModule {}


