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

/**
 * An excellent function that adds two numbers together.
 * @param {number} a - the first number
 * @param {number} b - the second number
 * @returns {number} - the result: a + b
 * @example
 * let x = plus(10, 20);
 * expect(x).to.equal(30);
 */
export function plus(a: number, b: number): number {
	return a + b;
}
