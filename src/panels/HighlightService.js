import {Injectable, EventEmitter} from '@angular/core';

/**
 * The HighlightService service notifies nested components about currently highlighted item
 */
@Injectable()
export class HighlightService {
    
    highlightedItemChanged$: EventEmitter<any>;
    
    constructor() {
        this.highlightedItemChanged$ = new EventEmitter();
    }
    
    highlight(item): void {
        this.highlightedItemChanged$.emit(item);
    }
    
}
