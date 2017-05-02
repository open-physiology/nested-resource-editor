import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ngx-dropdown';

@Component({
    selector: 'toolbar-filter',
    template: `
     <div class="input-group input-group-sm" style="width: 220px;">
        <input type="text" class="form-control" 
        [value]="filter" (input)="updateValue($event)" (keyup.enter)="applied.emit({filter: filter, mode: mode});"/>
        <div class="input-group-btn" dropdown>
          <button type="button" class="btn btn-secondary dropdown-toggle" aria-label="Filter" dropdown-open
            aria-haspopup="true" aria-expanded="false">
             <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="Filter">
            <li *ngFor="let option of options; let i = index" (click)="updateMode(option)">
              <a class="dropdown-item" href="#"> <span *ngIf="mode === option">&#10004;</span>{{option}}</a>
            </li>            
          </ul>
        </div>
      </div>
    `,
    styles: [`
        :host {float: right;}
        .form-control {
          height: 30px;
          box-shadow: none!important;
        }
        .form-control:focus  {
          border: 2px solid #ccc;
          box-shadow: none!important;
        }
    `]
})
export class ToolbarFilter {
    @Input() options: Array<string> = [];
    @Input() filter: string = "";
    @Output() applied = new EventEmitter();

    mode: string;

    ngOnInit(){
        if (this.options && (this.options.length > 0)) {
            this.mode = this.options[0];
        }
    }

    updateMode(option: string){
        this.mode = option;
        this.applied.emit({filter: this.filter, mode: this.mode});
    }

    updateValue(event){
        this.filter = event.target.value;
        this.applied.emit({filter: this.filter, mode: this.mode});
    }
}

@NgModule({
    imports: [ CommonModule, DropdownModule ],
    declarations: [ ToolbarFilter ],
    exports: [ ToolbarFilter ]
})
export class ToolbarFilterModule {}




