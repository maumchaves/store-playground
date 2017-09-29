import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Item } from './../models/item';

@Injectable()
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getItems(): Promise<Item[]> {
    return this.http.get(this.itemsUrl)
               .toPromise()
               .then(response => response.json().data as Item[])
               .catch(this.handleError);
  }

  getItem(id: number): Promise<Item> {
    return this.getItems()
               .then(items => items.find(item => item.id === id));
  }

  update(item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
