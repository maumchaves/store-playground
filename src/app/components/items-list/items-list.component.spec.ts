import { fakeAsync, tick } from '@angular/core/testing';

import { Item } from './../../models/item';

import { ItemService } from './../../services/item.service';
import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {

  let service: ItemService;
  let component: ItemsListComponent;

  beforeEach(() => {
    service = new ItemService(null);
    component = new ItemsListComponent(service);
  });

  it('should retrieve items from the server', fakeAsync(() => {
    spyOn(service, 'getItems').and.callFake(() => {
      return Promise.resolve([1,2,3]);
    });
    
    component.getItems();

    tick();
    expect(component.items).toBeTruthy();
  }));

  it('should set the limit (items to be shown) property with the items list length when retrieving items from the server and this property is NOT a number grater than -1', fakeAsync(() => {
    spyOn(service, 'getItems').and.callFake(() => {
      return Promise.resolve([1, 2, 3]);
    });

    component.ngOnInit();
    tick();

    expect(component.limit).toBe(component.items.length);
  }));

  it('should NOT modify the limit (items to be shown) property with the items list length when retrieving items from the server and this property is a number grater than -1', fakeAsync(() => {
    let items = [1, 2, 3, 4, 5, 6, 7, 8];
    component.limit = Math.floor(items.length/2);
    let limit = component.limit;
    spyOn(service, 'getItems').and.callFake(() => {
      return Promise.resolve(items);
    });

    component.ngOnInit();
    tick();

    expect(component.limit).toBe(limit);
  }));

  it('should copy the properties of a given item to the corresponding item in the items list', fakeAsync(() => {
    let oldItem = new Item();
    oldItem.id = 0;
    oldItem.favorite = false;
    let extraItem = new Item();
    extraItem.id = 1;
    extraItem.favorite = false;
    let latestItem = new Item();
    latestItem.id = oldItem.id;
    latestItem.favorite = true;

    spyOn(service, 'getItems').and.callFake(() => {
      return Promise.resolve([oldItem, extraItem]);
    });

    component.ngOnInit();
    tick();
    component.refreshItem(latestItem);

    for (var key in component.items[0]) {
      expect(component.items[0][key]).toBe(latestItem[key]);
    }
  }));

  it('should toggle the favorite property value of a given item and emit an event with this item', () => {
    let item = new Item();
    item.favorite = false;
    let oldItemFavoriteValue: boolean = item.favorite;
    let spy = spyOn(component.onItemChange, 'emit');
    spyOn(service, 'update');

    component.toggleFavorite(item);

    expect(item.favorite).not.toBe(oldItemFavoriteValue);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should call the update method of the item service when this has been toggled', () => {
    let item = new Item();
    item.favorite = false;
    let spy = spyOn(service, 'update');

    component.toggleFavorite(item);

    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should call the method to retrieve items from the server when the component init method is called', () => {
    let spy = spyOn(component, 'getItems');
    
    component.ngOnInit();
    
    expect(spy).toHaveBeenCalled();
  })

});