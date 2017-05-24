import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ngx-dropdown';

@Component({
    selector: 'toolbar-sort',
    template: `
        <div class="btn-group">
            <div class="btn-group" dropdown>
                <button type="button" class="btn btn-default btn-icon dropdown-toggle" aria-label="SortAsc"
                        dropdown-open>
                    <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="SortAsc">
                    <li role="menuitem" (click)="_onClick('unsorted')">
                        <a class="dropdown-item" href="#">
                            <span *ngIf="_sortByMode === 'unsorted'">&#10004;</span>
                            (unsorted)</a>
                    </li>
                    <li class="divider"></li>
                    <li *ngFor="let option of options; let i = index" role="menuitem" (click)="_onClick(option)">
                        <a class="dropdown-item" href="#">
                            <span *ngIf="_sortByMode === option">&#10004;</span>
                            {{option}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="btn-group" dropdown>
                <button type="button" class="btn btn-default btn-icon dropdown-toggle" aria-label="SortDesc"
                        dropdown-open>
                    <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="SortDesc">
                    <li *ngFor="let option of options; let i = index" role="menuitem" (click)="_onClick('-'+option)">
                        <a class="dropdown-item" href="#">
                            <span *ngIf="_sortByMode === '-'+option">&#10004;</span>
                            {{option}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        :host {float: right;}
    `]
})
/**
 * The ToolbarSort component, offers buttons to trigger sorting in ascending and descending order
 * @param {Array<string>} options - item properties that define a sorting sort, e.g., ["Id", "Name", "Class"]
 * @emits sorted                  - a user pressed the button to filter the list of resources
 */
export class ToolbarSort {
    @Input() options: Array<string> = [];
    @Output() sorted = new EventEmitter();

    _sortByMode = "unsorted";

    _onClick(item){
        this._sortByMode = item;
        this.sorted.emit(item);
    }
}

/**
 * The ToolbarSortModule module, offers the ToolbarSort component.
 */
@NgModule({
    imports: [ CommonModule, DropdownModule ],
    declarations: [ ToolbarSort ],
    exports: [ ToolbarSort ]
})
export class ToolbarSortModule {}




