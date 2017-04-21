import {NgModule, Component, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/add/operator/map';

import {HelloModule} from '../index.js';

/**
 * The HelloApp test application, which can greet the world or the universe!
 */
@Component({
	selector: 'hello-app',
	styles: [`
		ul {
			padding-left: 0;
		}
		ul > li {
			border:      solid 1px black;
			cursor:      pointer;
			width:       65px;
			margin:       5px;
			padding:      2px;
			list-style:  none;
			font-weight: bold;
		}
	`],
	template: `
	    <hello></hello>
	`,
})
export class HelloApp {
}

/**
 * The HelloAppModule test module, which supplies the _excellent_ HelloApp test application!
 */
@NgModule({
	imports: [
		BrowserModule,
		HelloModule
	],
	declarations: [
		HelloApp
	],
	bootstrap: [HelloApp],
})
export class HelloAppModule {}






