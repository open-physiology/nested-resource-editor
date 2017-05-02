/**
 * Created by Natallia on 4/18/2017.
 */
import {Component, Input} from '@angular/core';

@Component({
    selector: 'item-header',
    template: `
      <i class="pull-left glyphicon"
        [ngClass]="{
          'glyphicon-chevron-down': (item === selectedItem) && isSelectedOpen, 
          'glyphicon-chevron-right': (item !== selectedItem) || !isSelectedOpen}"></i>&nbsp;
        {{(item.id)? item.id: "?"}}: {{item.name}}
        <span class="pull-right">
          <img *ngIf="isType" class="imtip" src="src/images/type.png"/>
          <img class="icon" src="{{icon}}"/>
          <ng-content select="extra"></ng-content>
        </span>
  `,
    styles: [`
        .icon {
          height: 16px;
          width: 16px;
          padding: 0px;
        }
        .imtip {
          position: relative;
          bottom: 2px;
          left: 4px;
          width: 24px;
          height: 12px;
        }
    `]
})
export class ItemHeader {
    @Input() item: any;
    @Input() selectedItem: any;
    @Input() isSelectedOpen: boolean;
    @Input() icon: string;

    isType = false;

    ngOnInit(){
        this.isType = this.item && (this.item.class === "Type");
    }
}



