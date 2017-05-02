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
    `,
    styles: [`
        .btn-icon{
          height: 30px;
        }
    `],
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
    imports: [ CommonModule ],
    declarations: [ ToolbarCommands ],
    exports: [ ToolbarCommands ]
})
export class ToolbarCommandsModule {}




