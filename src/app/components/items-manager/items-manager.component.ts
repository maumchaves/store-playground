import { Component, DoCheck, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ItemsListComponent } from './../../components/items-list/items-list.component';
import { ItemsListModalComponent } from './../../components/items-list-modal/items-list-modal.component';

@Component({
  selector: 'items-manager',
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.scss']
})
export class ItemsManagerComponent implements DoCheck {

  constructor(private modalService: NgbModal) {}

  @ViewChild(ItemsListComponent)
  private itemsListComponent: ItemsListComponent;

  sortProperty: string = "title";
  oldSortProperty: string = "title";
  page: number = 1;
  limitShownItems: number = 5;
  favoritesModalResult: string;
  collectionSize: number;
  searchTerm: string;
  oldSearchTerm: string;

  updateCollectionSize(size: number) {
    setTimeout(() => this.collectionSize = size);
  }

  openFavorites() {
    const modalRef = this.modalService.open(ItemsListModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.onItemChange.subscribe(item => this.itemsListComponent.refreshItem(item));
  }

  getFirstIndexIn(page: number): number {
    return (page - 1) * this.limitShownItems;
  }

  ngDoCheck() {
    if (this.sortProperty !== this.oldSortProperty) {
      this.page = 1;
      this.oldSortProperty = this.sortProperty;
    }
    else if(this.searchTerm !== this.oldSearchTerm) {
      this.page = 1;
      this.oldSearchTerm = this.searchTerm;
    }
  }

}
