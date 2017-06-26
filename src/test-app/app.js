import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import '../libs/rxjs';
import $ from '../libs/jquery';
import modelFactory, {ajaxBackend} from 'open-physiology-model';

import {PipeTransformModule} from '../common/PipeTransformModule.js';
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
	_rs;

    /**
	 * The constructor of the component
     */
	constructor() {
		let {backend} = ajaxBackend({
			baseURL:     'http://open-physiology.org:8880',
			ajax:        $.ajax
		});
		let modelRef = modelFactory(backend);
		this._model = modelRef.classes;
        window.model = this._model;

        this._rs = this._model.Resource.p('all').subscribe(
			(data) => {
				this._items = data;
				if (this._items.length > 0){
					this._selectedItem = this._items[0];
				}
			});
		//model.Resource.getAll(); //Fails!
        let fma = this._model.ExternalResource.new({name: "FMA 13867"});
		let l1 = this._model.Lyph.new({name: "Kidney lobus"});
		let l2 = this._model.Lyph.new({name: "Red Blood Cell"});
        let l3 = this._model.Lyph.new({name: "Hilum of kidney"});
        this._model.Lyph.new({name: "Kidney", externals: [fma], layers: [l1, l2, l3]});

		this.resourceFactory = ::this.resourceFactory;
	}

    /**
	 * Create a new resource
     * @param clsName - resource class name
     * @param def     - object with resource definition
     * @returns a newly created resource
     */
    resourceFactory(clsName, def) {
        return this._model[clsName].new(def);
    }

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
