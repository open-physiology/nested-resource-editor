import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'toolbar-commands',
    template: `
       <button *ngIf="!options?.hideRemove"
      type="button" class="btn btn-default btn-icon" aria-label="Remove" (click)="removed.emit()">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
    <div class="btn-group">
      <button *ngIf="!options?.hideSave" 
        type="button" class="btn btn-default btn-icon" aria-label="Save" (click)="saved.emit()">
        <span class="glyphicon glyphicon-check"></span>
      </button>
      <button 
        *ngIf="!options?.hideRestore" 
        type="button" class="btn btn-default btn-icon" aria-label="Restore" (click)="canceled.emit()">
        <span class="glyphicon glyphicon-refresh"></span>
      </button>    
    </div>
    `
})
/**
 * The ToolbarCommands component, offers buttons to delete a resource, commit or rollback changes.
 *
 * @param {Object} options - a set of boolean options that indicate which buttons to show.
 * By default all three buttons are shown: {hideRemove: false, hideSave: false, hideRestore: false}
 * @param {string => string} transform - an optional function that can be used to transform option appearance

 * @emits removed   - a user pressed the button to delete the item
 * @emits canceled  - a user pressed the button to cancel changes (rollback)
 * @emits saved     - a user pressed the button to save changes (commit)
 */
export class ToolbarCommands {
    @Input()  options  = {};
    @Output() removed  = new EventEmitter();
    @Output() canceled = new EventEmitter();
    @Output() saved    = new EventEmitter();
}

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ToolbarCommands ],
    exports: [ ToolbarCommands ]
})
export class ToolbarCommandsModule {}




