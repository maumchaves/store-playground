import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { ItemService } from './services/item.service';

import { AppComponent } from './app.component';
import { ItemsManagerComponent } from './components/items-manager/items-manager.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsListModalComponent } from './components/items-list-modal/items-list-modal.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

import { SortItemsPipe } from './pipes/sort-items.pipe';
import { FavoriteItemsPipe } from './pipes/favorite-items.pipe';
import { CountListPipe } from './pipes/count-list.pipe';
import { Ng2SearchPipe } from './pipes/ng2-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemsManagerComponent,
    ToolbarComponent,
    ItemsListComponent,
    ItemsListModalComponent,
    ItemDetailsComponent,
    SortItemsPipe,
    FavoriteItemsPipe,
    CountListPipe,
    Ng2SearchPipe
  ],
  entryComponents: [
    ItemsListModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: ItemsManagerComponent
      },
      {
        path: 'item/:id',
        component: ItemDetailsComponent
      }
    ])
  ],
  providers: [
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
