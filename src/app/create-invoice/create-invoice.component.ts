import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';

import { Customer } from '../core/interfaces/customer';
import { Product } from '../core/interfaces/product';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {

  createInvoiceForm: FormGroup;
  customersList$: Observable<Customer[]>;
  productsList$: Observable<Product[]>;

  constructor(
    private customerService: CustomersService,
    private productsService: ProductsService,
  ) {
  }

  get createInvoiceNameControl() {
    return this.createInvoiceForm.get('name');
  }
  get createInvoiceProductControl() {
    return this.createInvoiceForm.get('product');
  }
  get createInvoiceQuantityControl() {
    return this.createInvoiceForm.get('quantity');
  }
  get createInvoicePriceControl() {
    return this.createInvoiceForm.get('price');
  }
  get createInvoiceDiscountControl() {
    return this.createInvoiceForm.get('discount');
  }
  get createInvoiceTotalControl() {
    return this.createInvoiceForm.get('total');
  }

  ngOnInit() {
    this.customersList$ = this.customerService.customersList$;
    this.productsList$ = this.productsService.productsList$;

    this.createInvoiceForm = new FormGroup({
      name: new FormControl(),
      product: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      total: new FormControl(),
    });
  }

  ngOnDestroy() {
  }
}
