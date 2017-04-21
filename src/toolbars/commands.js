/**
 * Created by Natallia on 4/13/2017.
 */
import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
    `,
    styleUrls: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],

})
export class ToolbarCommands {
    @Input()  options  = {};
    @Output() removed  = new EventEmitter();
    @Output() canceled = new EventEmitter();
    @Output() saved    = new EventEmitter();
}

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ ToolbarCommands ],
    exports: [ ToolbarCommands ]
})
export class ToolbarCommandsModule {}




