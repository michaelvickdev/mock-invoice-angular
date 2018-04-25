import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Product } from '../interfaces/product';


@Injectable()
export class ProductsService {

  constructor( private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<Product[]>('products');
  }
}
