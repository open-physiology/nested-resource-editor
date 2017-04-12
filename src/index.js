import {NgModule, Component, Input} from '@angular/core';

/**
 * The HelloComponent component, used to greet any subject you like!
 */
@Component({
	selector: 'hello',
	styles: [`
		p {
			font-style: italic;
		}
	`],
	template: '<p>Hello {{ subject }}!</p>',
})
export class HelloComponent {
	@Input() subject: string;
}

/**
 * The HelloModule module, which offers the excellent HelloComponent component!
 */
@NgModule({
	declarations: [ HelloComponent ],
	exports:      [ HelloComponent ]
})
export class HelloModule {}
