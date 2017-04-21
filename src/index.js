import {NgModule, Component, Input} from '@angular/core';

import {Subscription}   from 'rxjs/Subscription';

import {ToolbarCommandsModule} from './toolbars/commands.js';
import {ToolbarFilterModule} from './toolbars/filter.js';
import {ToolbarSortModule} from './toolbars/sort.js';
import {ToolbarAddModule} from './toolbars/add.js';
import {PipeTransformModule} from './common/pipes.js'
import {model} from "./common/utils";

//import {TemplateValueModule} from './components/templateValue';


import {ToolbarSettingsModule} from './common/toolbars/settings';

//import {NestedResourceWidget} from './panels/main';


@Component({
	selector: 'hello',
	template: `
		<toolbar-commands> </toolbar-commands>
		<toolbar-filter [filter]="'Class1'" [options]="['Name', 'ID', 'Class']"> </toolbar-filter>
		<toolbar-sort [options]="['Name', 'ID', 'Class']"> </toolbar-sort>
		<toolbar-add  [options]="items | setToArray"> </toolbar-add>
		<!--<toolbar-propertySettings  -->
            <!--[options] = "fieldOptions"-->
            <!--[transform]= "getFieldLabel"-->
            <!--(selectionChanged) = "visibleFieldsChanged($event)">-->
        <!--</toolbar-propertySettings>	-->
        	
        <!--<nested-resource-widget id="repo"-->
		  <!--[items]="items | setToArray" -->
		  <!--[caption]="'Resources'" -->
		  <!--(selectedItemChange)="onItemSelected($event)">-->
		<!--</nested-resource-widget>-->
		
		<!--<template-value -->
		  <!--[caption]="Test" -->
		  <!--[item]="testValue"-->
		  <!--[step]="1">-->
		<!--</template-value>-->

	`,
})
/**
 * The HelloComponent component, used to greet any subject you like!
 */
export class HelloComponent {

	// getFieldLabel = x => x;
	// fieldOptions = ['name', 'id'].map(field => ({value: field, selected: true, color: 'black'}));

	items:Array<any>;
	selectedItem:any;
	testValue = {value: 1, class: "Value"};

	rs: Subscription;
	constructor() {
		this.rs = model.Lyph.p('all').subscribe(
			(data: any) => {
				this.items = data;
			});
		model.Lyph.getAll();
	}

	ngOnDestroy() { this.rs.unsubscribe(); }

	onItemSelected(item:any) {
		setTimeout(() => { this.selectedItem = null; }, 0);
		setTimeout(() => { this.selectedItem = item; }, 0);
	}
}

@NgModule({
	imports: [
		ToolbarAddModule,
		ToolbarSortModule,
		ToolbarFilterModule,
		ToolbarCommandsModule,
		PipeTransformModule,
		//TemplateValueModule,

		//ToolbarSettingsModule,
		NestedResourceWidget
	],
	declarations: [ HelloComponent ],
	exports:      [ HelloComponent ]
})
/**
 * The HelloModule module, which offers the _excellent_ HelloComponent component!
 */
export class HelloModule {}



