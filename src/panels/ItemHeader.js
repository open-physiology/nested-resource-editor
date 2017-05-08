import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import $ from '../libs/jquery';
import {getResourceIcon} from "../common/utils";

@Component({
    selector: 'item-header',
    template: `
        <span class="pull-left glyphicon"
            [ngClass]="{
              'glyphicon-chevron-down':  isOpen, 
              'glyphicon-chevron-right': !isOpen}">
        </span>&nbsp;
        {{(item.id)? item.id: "?"}}: {{item.name}}
        <span class="pull-right">
          <img *ngIf="isType" class="imtip" src="../images/type.png"/>
          <img class="icon" [src]="getResourceIcon(item)"/>
          <button type="button" *ngIf="options?.showActive" class="btn btn-default btn-header" 
            [ngClass]="{'active': isActive}" (click)="activeItemChanged.emit(item)">
            <span class = "glyphicon" [ngClass]="{'glyphicon-pencil': isActive}"></span>
          </button>
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
        :host{
            display: block;
            padding: 4px;
        }
    `]
})
/**
 * The ItemHeader component configures accordion header for a given resource. The header consists of a left side icon that indicates whether
 * the accordion tab is open or closed, the title formed from the resource's id and name, and the right hand icon that shows
 * the class of the resource. The is an option to include to the header a checkbox with an icon to mark the resource as active.
 *
 * @param {Resource} item    - the resource for which header will be created
 * @param {Object} options   - an optional object with boolean options to configure header appearance, i.e., {showActive: true}
 * @param {Boolean} isOpen   - a boolean flag to indicate whether the item editor panel is open to choose proper left side icon
 * @param {Boolean} isActive - a boolean flag to indicate whether the item is active to draw or not the 'eye open' icon
 *
 * @emits activeItemChanged  - the item has been marked as active
 */
export class ItemHeader {
    @Input() item;
    @Input() options = {};
    @Input() isOpen;
    @Input() isActive;
    @Output() activeItemChanged = new EventEmitter();

    isType = false;
    getResourceIcon = getResourceIcon;

    constructor(el: ElementRef) {
        this.el = $(el.nativeElement);
    }

    ngOnInit() {
        this.isType = this.item && (this.item.class === "Type");
        this.el.parent().parent().parent().css("padding", 0);
    }
}



