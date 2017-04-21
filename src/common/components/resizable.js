/**
 * Created by Natallia on 4/18/2017.
 */
/**
 * Created by Natallia on 7/22/2016.
 */
import {NgModule, Component, ElementRef, EventEmitter, Renderer} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DragEvent, Draggable} from "./directive.draggable";

@Component({
    selector: '[resizable]',
    inputs: ['config:resizable'],
    outputs: ['resize', 'resizeStart', 'resizeStop'],
    template: `
      <ng-content></ng-content>
      <div *ngFor="let handle of handles" 
        [ngClass]="'resize-handle resize-handle-' + handle" draggable 
        (drag)="onDrag($event, handle)" 
        (dragStart)="onDragStart($event)" 
        (dragStop)="onDragStop($event)"></div>
      `
})
/**
 * An extension that makes any component draggable and resizable
 */
export class Resizable{
     resize = new EventEmitter();
     resizeStart = new EventEmitter();
     resizeStop = new EventEmitter();

     _handles: Array<string> = ['s', 'e', 'se'];
     _originalWidth: number;
     _originalHeight: number;
     _originalLeft: number;
     _originalTop: number;
     _minWidth: number = 0;
     _minHeight: number = 0;
     _model: any;
     _config: any;

    set config(value: any) {
        this._config = value;
        this.setConfig(this._config);
    }

    get handles(): Array<string> {
        return this._handles;
    }

     setConfig(config: any): void {
        for (let key in config) {
            var value = config[key];
            switch (key) {
                case 'model':
                    this._model = value;
                    break;
                case 'handles':
                    this._handles = value;
                    break;
                case 'minWidth':
                    this._minWidth = parseFloat(value);
                    break;
                case 'minHeight':
                    this._minHeight = parseFloat(value);
                    break;
            }
        }
    }

     constructor(_element: ElementRef, _renderer: Renderer) {}

     _setStyle(styleName: string, styleValue: string) {
        if (this._model) {
            this._model[styleName] = styleValue
        } else {
            this._renderer.setElementStyle(this._element.nativeElement, styleName, styleValue);
        }
    }

     onDrag(dragEvent: DragEvent, handle: string) {
        if (handle.indexOf('e') != -1) {
            this._setStyle('width', Math.max(this._minWidth, this._originalWidth + dragEvent.offset.left) + 'px');
        }
        if (handle.indexOf('s') != -1){
            this._setStyle('height', Math.max(this._minHeight, this._originalHeight + dragEvent.offset.top) + 'px');
        }
        if (handle.indexOf('w') != -1) {
            this._setStyle('left', (this._originalLeft + dragEvent.offset.left) + 'px');
            this._setStyle('width', Math.max(this._minWidth, this._originalWidth - dragEvent.offset.left) + 'px');
        }
        if (handle.indexOf('n') != -1) {
            this._setStyle('top', (this._originalTop + dragEvent.offset.top) + 'px');
            this._setStyle('height', Math.max(this._minHeight, this._originalHeight - dragEvent.offset.top) + 'px');
        }
        this.resize.emit(dragEvent);
    }

     onDragStart(event: Event) {
        this._originalWidth = this._element.nativeElement.offsetWidth;
        this._originalHeight = this._element.nativeElement.offsetHeight;
        this._originalLeft = this._element.nativeElement.offsetLeft;
        this._originalTop = this._element.nativeElement.offsetTop;
        this.resizeStart.emit(event);
    }

     onDragStop(event: Event) {
        this.resizeStop.emit(event);
    }
}

/**
 * The ResizableModule module, offers the Resizable component.
 */
@NgModule({
    imports: [ BrowserModule, DragEvent, Draggable],
    declarations: [ Resizable ],
    exports: [ Resizable ]
})
export class ResizableModule {}



