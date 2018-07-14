import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      return this.productsService.getProducts().pipe(
        take(1)
      );
  }
}
