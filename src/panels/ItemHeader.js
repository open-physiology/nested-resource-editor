import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import $ from '../libs/jquery';

@Component({
    selector: 'item-header',
    template: `
        <span class="pull-left glyphicon"
            [ngClass]="{
              'glyphicon-chevron-down':  isOpen, 
              'glyphicon-chevron-right': !isOpen}">
        </span>
        {{(item.id)? item.id: "?"}}: {{item.name}}
        <span class="pull-right">
          <img *ngIf="_isType" class="imtip" src="../images/type.png"/>
          <img class="icon" [src]="getResourceIcon()"/>
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
 */
export class ItemHeader {
    /**
     * {Resource} item    - the resource for which header will be created
     */
    @Input() item;
    /**
     *  {Object} options   - an optional object with boolean options to configure header appearance, i.e., {showActive: true}
     */
    @Input() options = {};
    /**
     *  {Boolean} isOpen   - a boolean flag to indicate whether the item editor panel is open to choose proper left side icon
     */
    @Input() isOpen;
    /**
     * {Boolean} isActive - a boolean flag to indicate whether the item is active to draw or not the 'eye open' icon
     */
    @Input() isActive;

    /**
     * @emits activeItemChanged  - the item has been marked as active
     */
    @Output() activeItemChanged = new EventEmitter();

    _isType = false;

    /**
     * The getResourceIcon function provides an icon for a given resource
     * @param {Resource} item - the resource
     * @returns {DataURI} - the icon for the resource class
     */
    getResourceIcon(): string{
        if (this.item.class === "Lyph" && this.item.axis) {
            return "../images/lyphWithAxis.png";
        }
        if (this.item.class === "Type"){
            return this.item['<--DefinesType'] && this.item['<--DefinesType'][1]
                ? this.item['<--DefinesType'][1].constructor.icon
                : "../images/resource.png";
        }
        return this.item.constructor.icon;
    }

    /**
     *
     * @param {ElementRef} el - the components's underlying native element
     */
    constructor(el: ElementRef) {
        this.el = $(el.nativeElement);
    }

    ngOnInit() {
        this._isType = this.item && (this.item.class === "Type");
        this.el.parent().parent().parent().css("padding", 0);
    }
}



