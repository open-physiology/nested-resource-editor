import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ngx-dropdown';

@Component({
    selector: 'toolbar-add',
    template: `
      <div *ngIf="options?.length > 1" class="btn-group" dropdown>
        <button type="button" class="btn btn-default btn-icon" aria-label="Add" dropdown-open>
          <span class="glyphicon glyphicon-plus"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="Add">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="added.emit(option)">
            <a class="dropdown-item" href="#">{{transform? transform(option): option}}</a>
          </li>
        </ul>
      </div>
      <button *ngIf="options?.length === 1" 
        type="button" class="btn btn-default btn-icon" (click)="added.emit(options[0])">
        <span class="glyphicon glyphicon-plus"></span>
      </button>
    `
})
/**
 * The ToolbarAdd component, offers a button to create a new resource from dropdown menu.
 */
export class ToolbarAdd {
    @Input() options: Array<string> = [];
    @Input() transform: (x: string) => string;
    @Output() added = new EventEmitter();
}

/**
 * The ToolbarAddModule module, offers the ToolbarAdd component.
 */
@NgModule({
    imports: [ CommonModule, DropdownModule ],
    declarations: [ ToolbarAdd ],
    exports: [ ToolbarAdd ]
})
export class ToolbarAddModule {}




