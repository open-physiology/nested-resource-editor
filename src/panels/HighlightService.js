import {Injectable, EventEmitter} from '@angular/core';

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
