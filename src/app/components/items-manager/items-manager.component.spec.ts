import { fakeAsync, tick } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { ItemsManagerComponent } from './items-manager.component';

describe('ItemsManagerComponent', () => {
  let component: ItemsManagerComponent;

  beforeEach(() => {
    component = new ItemsManagerComponent(null);
  });

  it('should update the collection size given a new size number', fakeAsync(() => {
    component.collectionSize = 3;
    let newSize = 10;

    component.updateCollectionSize(newSize);

    tick();
    expect(component.collectionSize).toBe(newSize);
  }));

  it('should return the first index of a given page number considering the page size', () => {
    let pageNumber = 3;
    component.limitShownItems = 5;

    let result = component.getFirstIndexIn(pageNumber);

    expect(result).toBe(10);
  });

  it('should reset the current page to 1 and update the old sort property when it is different than the current one', () => {
    component.page = 3;
    component.oldSortProperty = 'title';
    component.sortProperty = 'description';

    component.ngDoCheck();

    expect(component.page).toBe(1);
    expect(component.oldSortProperty).toBe(component.sortProperty);
  });

  it('should NOT modify neither the current page nor old sort property when it is equal than the current one', () => {
    component.page = 3;
    component.oldSortProperty = 'title';
    component.sortProperty = component.oldSortProperty;
    let currentPage = component.page;
    let oldSortProperty = component.oldSortProperty;

    component.ngDoCheck();

    expect(component.page).toBe(currentPage);
    expect(component.oldSortProperty).toBe(oldSortProperty);
  });

  it('should reset the current page to 1 and update the old search term when it is different than the current one', () => {
    component.page = 3;
    component.oldSearchTerm = 'hello';
    component.searchTerm = 'world';

    component.ngDoCheck();

    expect(component.page).toBe(1);
    expect(component.oldSearchTerm).toBe(component.searchTerm);
  });

  it('should NOT modify neither the current page nor old search term when it is equal than the current one', () => {
    component.page = 3;
    component.oldSearchTerm = 'hello';
    component.searchTerm = component.oldSearchTerm;
    let currentPage = component.page;
    let oldSearchTerm = component.oldSearchTerm;

    component.ngDoCheck();

    expect(component.page).toBe(currentPage);
    expect(component.oldSearchTerm).toBe(oldSearchTerm);
  });

});
