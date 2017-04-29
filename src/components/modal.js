import {NgModule, Component, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {model} from "../common/utils";

@Component({
    selector: 'modal-window',
    template:`
      <modal #myModal>
        <modal-header [show-close]="true">
            <h4 class="modal-title">Select supertype measurables to replicate</h4>
        </modal-header>
        <modal-body>
            <li *ngFor="let option of supertypeMeasurables; let i = index">
              <a class="small" href="#">
              <input type="checkbox" 
                [checked]="option.selected" 
                (change)="updateValue(option, $event)"/>&nbsp;
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
 * ModalWindow component, provides generation of measurables in a pop-up window.
 */
export class ModalWindow{
    @Input()  item: any;
    @Output() closed = new EventEmitter();

    //Measurable replication
    supertypeMeasurables : Array <any> = [];
    measurablesToReplicate: Set<any> = new Set();

    @ViewChild('myModal')
    modal: ModalComponent;

    generateMeasurables() {
        let allSupertypeMeasurables = [];
        for (let type of this.item.types) {
            for (let supertype of type.supertypes) {
                if (supertype.definition && supertype.definition.measurables) {
                    let supertypeMeasurables = Array.from(new Set(supertype.definition.measurables.map((item:any) => item.type)));
                    for (let supertypeMeasurable of supertypeMeasurables) {
                        if (allSupertypeMeasurables.indexOf(supertypeMeasurable) < 0)
                            allSupertypeMeasurables.push(supertypeMeasurable);
                    }
                }
            }
        }
        this.supertypeMeasurables = allSupertypeMeasurables.map(x => {
            return {value: x, selected: this.measurablesToReplicate.has(x)}
        });
        this.modal.open();
    }

    close(event) {
        if (this.measurablesToReplicate.size > 0){
            let protoMeasurables = Array.from(this.measurablesToReplicate);
            for (let protoMeasurable of protoMeasurables){
                let newMeasurable = model.Measuarable.new(protoMeasurable);
                newMeasurable.location = this.item;
            }
        }
        this.modal.close();
        this.closed.emit(event);
    }

    updateValue(option, event){
        option.selected = event.target.checked;
        if ( this.measurablesToReplicate.has(option.value) && !option.selected)
            this.measurablesToReplicate.delete(option.value);
        if (!this.measurablesToReplicate.has(option.value) && option.selected)
            this.measurablesToReplicate.add(option.value);
    }
}

/**
 * The ModalWindowModule module, offers the ModalWindow component.
 */
@NgModule({
    imports: [ CommonModule, Ng2Bs3ModalModule],
    declarations: [ ModalWindow ],
    exports: [ ModalWindow ]
})
export class ModalWindowModule {}


