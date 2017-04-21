/**
 * Created by Natallia on 4/18/2017.
 */
import {NgModule, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer } from '@angular/core';
import { Observable, Subscription} from 'rxjs/Rx';

export class Position {
    constructor(left?: number, top?: number) { }
}

export class DragEvent {
    cancelled: boolean = false;
    constructor(mouseDown: UIEvent, mouseMove: UIEvent, position: Position, offset: Position) {}
}

const makeInputObservable =
    (node: Node, eventName: string, useCapture?: boolean): Observable<UIEvent> => {
        return Observable.fromEventPattern<MouseEvent>(
            (handler: EventListener) => { node.addEventListener(eventName, handler, useCapture); },
            (handler: EventListener) => { node.removeEventListener(eventName, handler, useCapture); })
    };


@Directive({
    selector: '[draggable]',
    inputs: ['config:draggable'],
    outputs: ['drag', 'dragStart', 'dragStop']
})
/**
 * The Draggable directive, allows you to move the element it is assigned to control.
 */
export class Draggable implements OnDestroy, OnInit {
    drag = new EventEmitter();
    dragStart = new EventEmitter();
    dragStop = new EventEmitter();

    _dragSubscription: Subscription;
    _isDragging:boolean = false;
    _axis:string;
    _config:any;
    _mouseDelay:number = 50;
    _mouseDelayMet:boolean;
    _mouseDelayTimer:number;
    _mouseDistance:number = 5;
    _mouseDistanceMet:boolean = false;
    _containment:ClientRect = null;
    _dragOffsetX:number;
    _dragOffsetY:number;
    _elementStartX:number;
    _elementStartY:number;
    _model:any;

    set config(value:any) {
        this._config = value;
        this.setConfig(this._config);
    }

    constructor(_element:ElementRef, _renderer:Renderer) {
}

  setConfig(config:any):void {
    for (let key in config) {
        var value = config[key];
        switch (key) {
            case 'axis':
                this._axis = value;
                break;
            case 'delay':
                this._mouseDelay = parseInt(value);
                break;
            case 'distance':
                this._mouseDistance = parseInt(value);
                break;
            case 'containment':
                this._containment = value;
                break;
            case 'model':
                this._model = value;
                break;
        }
    }
  }

    _generatePosition(event:MouseEvent):Position {
        var posX = (this._axis == 'y') ? this._elementStartX : this._elementStartX + this._dragOffsetX;
        var posY = (this._axis == 'x') ? this._elementStartY : this._elementStartY + this._dragOffsetY;
        return new Position(posX, posY);
    }

    _start():void {
        this._isDragging = false;
        this._mouseDelayMet = this._mouseDelay == 0;
        this._mouseDistanceMet = this._mouseDistance == 0;
        this._elementStartX = this._element.nativeElement.offsetLeft;
        this._elementStartY = this._element.nativeElement.offsetTop;
        if (!this._mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(() => {
                this._mouseDelayMet = true;
            }, this._mouseDelay);
        }
    }

    _update(mouseDownEvent:MouseEvent, mouseMoveEvent:MouseEvent):void {
        this._dragOffsetX = mouseMoveEvent.clientX - mouseDownEvent.clientX;
        this._dragOffsetY = mouseMoveEvent.clientY - mouseDownEvent.clientY;
        this._mouseDistanceMet = Math.abs(this._dragOffsetX) > this._mouseDistance || Math.abs(this._dragOffsetY) > this._mouseDistance
        if (!this._isDragging && this._mouseDelayMet && this._mouseDistanceMet) {
            this.dragStart.emit(event);
            this._isDragging = true;
        }
    }

  ngOnInit():void {
    var mouseDownObservable = Observable.fromEvent(this._element.nativeElement, 'mousedown').filter((md:MouseEvent) => md.which == 1);
        var mouseMoveObservable = Observable.fromEvent(this._element.nativeElement.ownerDocument, 'mousemove');
        var mouseUpObservable = Observable.fromEvent(this._element.nativeElement.ownerDocument, 'mouseup');
        var clickObservable = makeInputObservable(this._element.nativeElement.ownerDocument, 'click', true);
        var dragObservable = mouseDownObservable.flatMap<DragEvent>((mouseDownEvent:MouseEvent) => {
        mouseDownEvent.preventDefault();
        mouseDownEvent.stopPropagation();
        this._start();
        return mouseMoveObservable
            .map((mouseMoveEvent:MouseEvent) => {
                this._update(mouseDownEvent, mouseMoveEvent);
                return new DragEvent(mouseDownEvent, mouseMoveEvent, this._generatePosition(mouseMoveEvent), new Position(this._dragOffsetX, this._dragOffsetY));
            })
            .filter(() => this._isDragging)
            .takeUntil(mouseUpObservable
                .map((mouseUpEvent: any) => {
                    clearInterval(this._mouseDelayTimer);
                    if (this._isDragging)
                        this.dragStop.emit(mouseUpEvent);
                })
                .zip(clickObservable.map((clickEvent:MouseEvent) => {
                    if (this._isDragging) {
                        clickEvent.stopPropagation();
                        this._isDragging = false;
                    }
                }))
            );
    });

    this._dragSubscription = dragObservable.subscribe((event: any) => {
            this.drag.emit(event);
            setTimeout(() => {
                if (!event.cancelled) {
                    let top = event.position.top;
                    let left = event.position.left;
                    this._setStyle('top', top + 'px');
                    this._setStyle('left', left + 'px');
                }
            });
        });
    }

    _setStyle(styleName:string, styleValue:string) {
        if (this._model) {
            this._model[styleName] = styleValue;
        } else {
            this._renderer.setElementStyle(this._element.nativeElement, styleName, styleValue);
        }
    }

      ngOnDestroy():void {
        this._dragSubscription.unsubscribe();
    }
}

/**
 * The DraggableModule module, offers the Draggable directive.
 */
@NgModule({
    declarations: [ Draggable ],
    exports: [ Draggable ]
})
export class DraggableModule {}


