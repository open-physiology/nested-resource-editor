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
                                [items]="_items | setToArray"
								[resourceFactory]="resourceFactory"
                                (selectedItemChange)="_onSelected($event)"
								(updated)="_onUpdated($event)"
								(removed)="_onRemoved($event)">
        </nested-resource-widget>
	`
})
/**
 * The TestComponent component, showing off the nested resource editor!
 */
export class TestApp {
	_model;
	_items;
	_selectedItem;

	_rs: Subscription;

    /**
	 * The constructor of the component
     */
	constructor() {
		let {backend} = ajaxBackend({
			baseURL:     'http://open-physiology.org:8880',
			ajax:        $.ajax
		});
		let modelRef = modelFactory(backend);
		window.module = modelRef;
		this._model = modelRef.classes;

		this._rs = this._model.Resource.p('all').subscribe(
			(data) => {
				this._items = data;
				if (this._items.length > 0){
					this._selectedItem = this._items[0];
				}
			});
		//model.Resource.getAll(); //Fails!
		this._model.Lyph.new({name: "Kidney"}, {createAxis: true});
		this._model.Lyph.new({name: "Heart"});
		this._model.Lyph.new({name: "Head"});
	}

    /**
	 * Create a new resource
     * @param clsName - resource class name
     * @param def     - object with resource definition
     * @param options - options
     * @returns a newly created resource
     */
    resourceFactory = (clsName, def, options = {}) => {
		return this._model[clsName].new(def, options);
	};

    /**
	 * Unsubscribe from subscriptions
     */
	ngOnDestroy() { this._rs.unsubscribe(); }

	_onSelected(item) {
		setTimeout(() => { this._selectedItem = null; }, 0);
		setTimeout(() => { this._selectedItem = item; }, 0);
	}


	_onUpdated(item){}

	_onRemoved(item){}
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
