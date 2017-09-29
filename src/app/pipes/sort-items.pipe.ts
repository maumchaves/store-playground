import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './../models/item';

@Pipe({ name: 'sortItems' })
export class SortItemsPipe implements PipeTransform {
  transform(allItems: Item[], sortProperty: string) {
    return allItems.sort((a, b) => {
      if(typeof a[sortProperty] === 'string') {
        return a[sortProperty].localeCompare(b[sortProperty]);
      } else {
        return a[sortProperty]-b[sortProperty];
      }
    });
  }
}
