import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Product } from '../../core/interfaces/product';

import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-invoice-items-group',
  templateUrl: './invoice-items-group.component.html',
  styleUrls: ['./invoice-items-group.component.scss']
})
export class InvoiceItemsGroupComponent implements OnInit {
  @Input('itemsGroup') itemsGroup: FormGroup;
  @Input('groupIndex') groupIndex: number;

  productsList$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService
  ) {
  }

  get createInvoiceQuantityControl() {
    return this.itemsGroup.get('quantity');
  }
  get createInvoicePriceControl() {
    return this.itemsGroup.get('price');
  }

  ngOnInit() {
    this.productsList$ = this.productsService.productsList$;
  }
}
