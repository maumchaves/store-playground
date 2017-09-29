import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  sortProperties: string[] = ["title", "description", "price", "email"];
  @Input() selectedSortProp: string = "title";
  @Output() selectedSortPropChange = new EventEmitter<string>();

  onSelectSortProp(sortProperty: string): void {
    this.selectedSortProp = sortProperty;
    this.selectedSortPropChange.emit(sortProperty);
  }

}
