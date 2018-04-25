import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { shareReplay } from 'rxjs/operators';

import { Product } from '../interfaces/product';


@Injectable()
export class ProductsService {

  productsList$: Observable<Product[]>;

  constructor( private httpClient: HttpClient) {}

  getProducts() {
    return this.productsList$ = this.httpClient.get<Product[]>('products').pipe(
      shareReplay(1)
    );
  }
}
