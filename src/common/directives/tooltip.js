/**
 * Created by Natallia on 4/18/2017.
 */
import {Directive, TemplateRef, Input} from '@angular/core';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective {
    @Input('tooltip') content:string;
    @Input('tooltipHtml') htmlContent:string | TemplateRef<any>;
    @Input('tooltipPlacement') placement:string = 'top';
    @Input('tooltipIsOpen') isOpen:boolean;
    @Input('tooltipEnable') enable:boolean = true;
    @Input('tooltipAppendToBody') appendToBody:boolean;
    @Input('tooltipClass') popupClass:string;
    @Input('tooltipContext') tooltipContext:any;
}
