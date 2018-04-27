import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/publishReplay';

import { Product } from '../interfaces/product';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';


@Injectable()
export class ProductsService {

  productsList$: Observable<Product[]>;
  productsStream$: ConnectableObservable<Product[]>;
  passRequest: Subject<Observable<Product[]>>;

  constructor( private httpClient: HttpClient) {
    this.passRequest = new Subject();
    this.productsStream$ = this.passRequest.mergeAll().publishReplay(1);
    this.productsStream$.connect();

    this.productsList$ = this.productsStream$.pipe(
      map( product => product )
    );
  }

  getProducts() {
    this.passRequest.next(this.httpClient.get<Product[]>('products'));
    return this.productsList$;
    //return this.productsList$ = this.httpClient.get<Product[]>('products').pipe(
    //  shareReplay(1)
    //);
  }
}
