/**
 * Created by Natallia on 4/13/2017.
 */
import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DropdownModule} from 'ngx-dropdown';

@Component({
    selector: 'toolbar-sort',
    template: `
    <div class="btn-group">
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default btn-icon dropdown-toggle" aria-label="SortAsc" dropdown-open>
          <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="SortAsc">
          <li role="menuitem" (click)="onClick('unsorted')">
            <a class="dropdown-item" href="#">
            <span *ngIf="sortByMode === 'unsorted'">&#10004;</span>
            (unsorted)</a>
          </li>
          <li class="divider"></li>
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="onClick(option)">
            <a class="dropdown-item" href="#">
              <span *ngIf="sortByMode === option">&#10004;</span>
              {{option}}
            </a>
          </li>
        </ul>
      </div>
      <div class="btn-group" dropdown>
        <button type="button" class="btn btn-default btn-icon dropdown-toggle" aria-label="SortDesc" dropdown-open>
          <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="SortDesc">
          <li *ngFor="let option of options; let i = index" role="menuitem" (click)="onClick('-'+option)">
            <a class="dropdown-item" href="#">
             <span *ngIf="sortByMode === '-'+option">&#10004;</span>
             {{option}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    `,
    styleUrls: [
        '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],

})
/**
 * The ToolbarSort component, offers sorting modes according to given options in a dropdown menu.
 */
export class ToolbarSort {
    @Input() options: Array<string> = [];
    @Output() sorted = new EventEmitter();

    sortByMode = "unsorted";

    onClick(item: any){
        this.sortByMode = item;
        this.sorted.emit(item);
    }
}

@NgModule({
    imports: [ BrowserModule, DropdownModule ],
    declarations: [ ToolbarSort ],
    exports: [ ToolbarSort ]
})
export class ToolbarSortModule {}




