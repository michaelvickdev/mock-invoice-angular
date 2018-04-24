import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Products } from '../interfaces/products';

@Injectable()

export class ProductsService {
  
  constructor( private httpClient: HttpClient) {}
  
  getProducts() {
      return this.httpClient.get<Products[]>('http://api.invoice-app.2muchcoffee.com/api/products');
  }
}
