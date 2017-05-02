import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ngx-dropdown';
//import {DraggableModule} from '../directives/draggable';

@Component({
    selector: 'toolbar-propertySettings',
    template: `
      <div class="dropdown pull-right" dropdown [dropdownToggle]="false">
      <button type="button" class="btn btn-default btn-icon" aria-label="Settings" dropdown-open>
        <span class="glyphicon glyphicon-list"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="Settings" 
      dropdown-not-closable-zone>
      <!--&lt;!&ndash; draggable&ndash;&gt;-->
        <li *ngFor="let option of options">
          <a class="small" href="#">
              <input type="checkbox"
              [checked]="option.selected" (change)="updateValue(option, $event)"/>&nbsp;
              <span [style.color]="option.color">{{transform? transform(option.value): option.value}}</span>
          </a>
        </li>
      </ul>
    </div>
    `
})
/**
 * The ToolbarPropertySettings component, offers a button to choose visible properties from dropdown menu.
 */
export class ToolbarPropertySettings {
    @Input()  options = [];
    @Input()  transform: (x: string) => string;
    @Output() selectionChanged = new EventEmitter();

    updateValue(option, event){
        option.selected = event.target.checked;
        this.selectionChanged.emit(option);
    }
}

/**
 * The ToolbarSettingsModule module, offers the ToolbarPropertySettings component.
 */
@NgModule({
    imports: [ CommonModule, DropdownModule /*BsDropdownModule.forRoot()/*, DraggableModule*/],
    declarations: [ ToolbarPropertySettings ],
    exports: [ ToolbarPropertySettings ]
})
export class ToolbarSettingsModule {}




