import {NgModule, Component, Input} from '@angular/core';

import {Subscription}   from 'rxjs/Subscription';

import {model} from "./common/utils";
import {NestedResourceWidgetModule} from './panels/main';

@Component({
	selector: 'hello',
	template: `
        
        <nested-resource-widget id="repo"
		  [items]="items | setToArray" 
		  [caption]="'Resources'" 
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
 * The HelloComponent component, used to greet any subject you like!
 */
export class HelloComponent {

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

@NgModule({
	imports: [
		NestedResourceWidgetModule
	],
	declarations: [ HelloComponent ],
	exports:      [ HelloComponent ]
})
/**
 * The HelloModule module, which offers the _excellent_ HelloComponent component!
 */
export class HelloModule {}



