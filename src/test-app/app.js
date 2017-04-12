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
	    <ul>
	      <li><a (click)="subject = 'world'">World</a></li>
	      <li><a (click)="subject = 'universe'">Universe</a></li>
	    </ul>
	    <hello [subject]="subject"></hello>
	`,
})
export class HelloApp {
	subject: string = 'world';
}

/**
 * The HelloAppModule test module, which supplies the excellent HelloApp test application!
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
