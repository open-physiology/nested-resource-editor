/**
 * Created by Natallia on 4/18/2017.
 */
import {Component, Input} from '@angular/core';

@Component({
    selector: 'item-header',
    inputs: ['item', 'selectedItem', 'isSelectedOpen', 'icon'],
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
  `
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
