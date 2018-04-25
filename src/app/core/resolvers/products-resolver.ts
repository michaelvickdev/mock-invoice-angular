import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsResolver implements Resolve<Product[]> {

  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if (this.productsService.productsList$) {
      return this.productsService.productsList$;
    } else {
      this.productsService.getProducts();
    }
  }
}
