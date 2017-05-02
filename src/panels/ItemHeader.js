import {Component, Input, ElementRef} from '@angular/core';
import $ from '../libs/jquery';

@Component({
    selector: 'item-header',
    template: `
        <span class="pull-left glyphicon"
            [ngClass]="{
              'glyphicon-chevron-down':  (item === selectedItem) && isSelectedOpen, 
              'glyphicon-chevron-right': (item !== selectedItem) || !isSelectedOpen}">
        </span>&nbsp;
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
          padding: 0;
        }
        .imtip {
          position: relative;
          bottom: 2px;
          left: 4px;
          width: 24px;
          height: 12px;
        } 
        :host{display: block}
    `]
})
export class ItemHeader {
    @Input() item;
    @Input() selectedItem;
    @Input() isSelectedOpen: boolean;
    @Input() icon: string;

    isType = false;

    constructor(el: ElementRef) {
        this.el = $(el.nativeElement);

    }

    ngOnInit() {
        this.isType = this.item && (this.item.class === "Type");
        this.el.parent().parent().parent().css("padding", 0);
    }
}



