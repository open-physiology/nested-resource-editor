import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import '../libs/rxjs';
import $ from '../libs/jquery';
import modelFactory, {ajaxBackend} from 'open-physiology-model';

import {PipeTransformModule} from '../common/PipeTransformModule.js';
import {Subscription}   from 'rxjs/Subscription';
import {NestedResourceWidgetModule} from '../index.js';

@Component({
	selector: 'test-app',
	template: `
        <nested-resource-widget id="repo"
		  caption="Resources" 
		  [model]="model"
		  [items]="items | setToArray" 
		  (selectedItemChange)="onItemSelected($event)">
		</nested-resource-widget>
	`
})
/**
 * The TestComponent component, showing off the nested resource editor!
 */
export class TestApp {
	model;
	items;
	selectedItem;

	rs: Subscription;
	constructor() {
		let {backend} = ajaxBackend({
			baseURL:     'http://open-physiology.org:8880',
			ajax:        $.ajax
		});
		let modelRef = modelFactory(backend);
		window.module = modelRef;
		this.model = modelRef.classes;

		this.rs = this.model.Resource.p('all').subscribe(
			(data) => {
				this.items = data;
				if (this.items.length > 0){
					this.selectedItem = this.items[0];
				}
			});
		//model.Resource.getAll(); //Fails!
		this.model.Lyph.new({name: "Kidney"}, {createAxis: true});
		this.model.Lyph.new({name: "Heart"});
		this.model.Lyph.new({name: "Head"});
	}

	ngOnDestroy() { this.rs.unsubscribe(); }

	onItemSelected(item) {
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
