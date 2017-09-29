import { Component, EventEmitter, Input, Output, OnInit, AfterViewChecked } from '@angular/core';
import { Item } from './../../models/item';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, AfterViewChecked {

  constructor(private itemService: ItemService) { }

  items: Item[];
  transfListCounter: Object = { count: null };
  oldTransfListCounter: Object = { count: null };
  @Input() liteList: boolean = false;
  @Input() sortProperty: string = "title";
  @Input() startFrom: number = 0;
  @Input() limit: number; // Number of items to be shown
  @Input() enableFavoriteFilter: boolean = false;
  @Input() search: string;
  @Output() onTransfListSizeChange = new EventEmitter<Object>();
  @Output() onItemChange = new EventEmitter<Item>();

  getItems(): void {
    this.itemService.getItems().then(items => {
      this.limit = this.limit > -1 ? this.limit : items.length;
      this.items = items;
    });
  }

  refreshItem(latestItem: Item): void {
    let oldItem = this.items.find(item => item.id === latestItem.id);
    Object.assign(oldItem, latestItem);
  }

  toggleFavorite(item: Item): void {
    item.favorite = !item.favorite;
    this.onItemChange.emit(item);
    this.itemService.update(item);
  }

  ngOnInit(): void {
    this.getItems();
  }

  ngAfterViewChecked() {
    if(this.transfListCounter["count"] !== this.oldTransfListCounter["count"]) {
      Object.assign(this.oldTransfListCounter, this.transfListCounter);
      this.onTransfListSizeChange.emit(this.transfListCounter["count"]);
    }
  }

}
