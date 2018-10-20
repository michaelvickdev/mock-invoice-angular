import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Product } from '../core/interfaces/product';

import { ProductsService } from '../core/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  columnsToDisplay: Array<string>;
  productsList$: Observable<Product[]>;

  constructor(
    private productsServices: ProductsService
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'product_name', 'price'];

    this.productsList$ = this.productsServices.productsList$;
  }
}
