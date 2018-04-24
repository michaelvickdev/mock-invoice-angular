import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList$: Observable<any>;
  columnsToDisplay: Array<string>;

  constructor(
    private productsServices: ProductsService
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['id', 'product_name', 'price'];

    this.productsList$ = this.productsServices.getProducts()
    .map(product => product);
  }
}
