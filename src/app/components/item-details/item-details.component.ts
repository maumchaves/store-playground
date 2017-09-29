import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Item } from './../../models/item';

import { ItemService } from './../../services/item.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  item: Item;

  getItem(id: number): Promise<Item> {
    return this.itemService.getItem(id);
  }

  toggleFavorite(item: Item) {
    item.favorite = !item.favorite;
    this.itemService.update(this.item);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.getItem(+params.get('id')))
      .subscribe(item => this.item = item);
  }

}
