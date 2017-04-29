import {NgModule, Component, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {PipeTransformModule} from '../common/pipes.js';

import {Subscription}   from 'rxjs/Subscription';

import {model} from "../common/utils";
import {NestedResourceWidgetModule} from '../index.js';

@Component({
	selector: 'test-app',
	template: `
        
        <nested-resource-widget id="repo"
		  [items]="items | setToArray" 
		  caption="Resources" 
		  (selectedItemChange)="onItemSelected($event)">
		</nested-resource-widget>
		
		<!--<template-value -->
		  <!--[caption]="Test" -->
		  <!--[item]="testValue"-->
		  <!--[step]="1">-->
		<!--</template-value>-->
	`
})
/**
 * The TestComponent component, showing off the nested resource editor!
 */
export class TestApp {

	items:Array<any>;
	selectedItem:any;

	rs: Subscription;
	constructor() {
		this.rs = model.Lyph.p('all').subscribe(
			(data: any) => {
				this.items = data;
				if (this.items.length > 0){
					this.selectedItem = this.items[0];
				}
				console.log("DATA", data);
			});
		//model.Lyph.getAll(); //Fails!
		model.Lyph.new({id: 1, name: "Kidney"});
	}

	ngOnDestroy() { this.rs.unsubscribe(); }

	onItemSelected(item:any) {
		setTimeout(() => { this.selectedItem = null; }, 0);
		setTimeout(() => { this.selectedItem = item; }, 0);
	}
}

/**
 * The TestAppModule test module, which supplies the _excellent_ TestApp test application!
 */
@NgModule({
	imports: [
		BrowserModule,
		NestedResourceWidgetModule,
		PipeTransformModule
	],
	declarations: [
		TestApp
	],
	bootstrap: [TestApp],
})
export class TestAppModule {}
