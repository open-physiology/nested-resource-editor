import {NgModule, Component, Input} from '@angular/core';

@Component({
	selector: 'hello',
	styles: [`
		p {
			font-style: italic;
		}
	`],
	template: '<p>Hello {{ subject }}!</p>',
})
/**
 * The HelloComponent component, used to greet any subject you like!
 */
export class HelloComponent {
	@Input() subject: string;
}

@NgModule({
	declarations: [ HelloComponent ],
	exports:      [ HelloComponent ]
})
/**
 * The HelloModule module, which offers the _excellent_ HelloComponent component!
 */
export class HelloModule {}
