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
            padding: 2px;
        }
    `]
})
/**
 * The ItemHeader component configures accordion header
 */
export class ItemHeader {
    @Input() item;
    @Input() options: {};
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



