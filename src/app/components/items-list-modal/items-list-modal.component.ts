import {Component, EventEmitter, Output } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from './../../models/item';

@Component({
  selector: 'items-list-modal',
  templateUrl: './items-list-modal.component.html',
  styleUrls: ['./items-list-modal.component.scss']
})
export class ItemsListModalComponent {

  constructor(public activeModal: NgbActiveModal) {}

  searchTerm: string;
  @Output() onItemChange = new EventEmitter<Item>();

}
