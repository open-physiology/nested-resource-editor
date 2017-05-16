import {Injectable, EventEmitter} from '@angular/core';

/**
 * The HighlightService service notifies nested components about currently highlighted item
 */
@Injectable()
export class HighlightService {

    /**
     * @emits {EventEmitter} highlightedItemChanged$ - the event that the service emits when
     * a new item is highlighted in a nested resource widget
     */
    highlightedItemChanged$: EventEmitter;

    constructor() {
        this.highlightedItemChanged$ = new EventEmitter();
    }

    /**
     * @param {Resource} item - the highlighted item
     */
    highlight(item): void {
        this.highlightedItemChanged$.emit(item);
    }
    
}
