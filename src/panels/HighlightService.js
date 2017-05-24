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

    /**
     * The constructor of the component
     */
    constructor() {
        this.highlightedItemChanged$ = new EventEmitter();
    }

    /**
     * Notify components that the highlighted item changed
     * @param {Resource} item - the new highlighted item
     */
    highlight(item) {
        this.highlightedItemChanged$.emit(item);
    }
    
}
