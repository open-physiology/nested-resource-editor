import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ngx-dropdown';
//import {Ng2DraggableModule} from 'ng2-draggable';

@Component({
    selector: 'toolbar-propertySettings',
    template: `
      <div class="dropdown pull-right" dropdown [dropdownToggle]="false">
          <button type="button" class="btn btn-default btn-icon" aria-label="Settings" dropdown-open>
            <span class="glyphicon glyphicon-list"></span>
          </button>
          <!--<div draggable="true">-->
              <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="Settings" 
              dropdown-not-closable-zone>
                <li *ngFor="let option of options">
                  <a class="small" href="#">
                      <input type="checkbox"
                      [checked]="option.selected" (change)="updateValue(option, $event)"/>&nbsp;
                      <span [style.color]="option.color">{{transform? transform(option.value): option.value}}</span>
                  </a>
                </li>
              </ul>
          <!--</div>-->
      </div>
    `
})
/**
 * The ToolbarPropertySettings component, offers a button to choose checkboxes with configuration properties from the drop-down menu.
 *
 * @param {Array<Object>} options - the list of properties to choose from, i.e., item types (resource classes)
 *   A configuration option is an Object with the visible label and the initial value, i.e.,
 * @param {string => string} transform - an optional function that can be used to transform option appearance
 *
 * @emits selectionChanged  - a user changed the value of a checkbox
 *
 */
export class ToolbarPropertySettings {
    @Input()  options = [];
    @Input()  transform: (x: string) => string;
    @Output() selectionChanged = new EventEmitter();

    updateValue(option, event) {
        option.selected = event.target.checked;
        this.selectionChanged.emit(option);
    }
}

/**
 * The ToolbarSettingsModule module, offers the ToolbarPropertySettings component.
 */
@NgModule({
    imports: [CommonModule, DropdownModule/*, Ng2DraggableModule*/],
    declarations: [ToolbarPropertySettings],
    exports: [ToolbarPropertySettings]
})
export class ToolbarSettingsModule {
}




