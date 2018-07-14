import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { mergeScan} from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';

import { Product } from '../interfaces/product';


@Injectable()
export class ProductsService {
  productsList$: ConnectableObservable<Product[]>;
  passRequest: Subject<Observable<Product[]>>;

  constructor( private httpClient: HttpClient) {
    this.passRequest = new Subject();
    this.productsList$ = this.passRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getProductsRequest(), null)
    ).publishReplay(1);
    this.productsList$.connect();
}

  getProducts() {
    this.passRequest.next();
    return this.productsList$;
  }

  getProductsRequest() {
    return this.httpClient.get<Product[]>('products');
  }
}
