import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './../models/item';

@Pipe({ name: 'favoriteItems', pure: false })
export class FavoriteItemsPipe implements PipeTransform {
  transform(allItems: Item[], enabled: boolean) {
    if(!enabled) return allItems;
    return allItems.filter(item => item.favorite);
  }
}
