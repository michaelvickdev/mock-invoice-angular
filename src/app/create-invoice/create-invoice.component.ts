import { Component, OnInit } from '@angular/core';
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
export class CreateInvoiceComponent implements OnInit {

  newInvoice: FormGroup;
  customersList$: Observable<Customer[]>;
  productsList$: Observable<Product[]>;

  constructor(
    private customerService: CustomersService,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit() {
    this.customersList$ = this.customerService.customersList$;
    this.productsList$ = this.productsService.productsList$;

    this.newInvoice = new FormGroup({
      name: new FormControl(),
      product: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      total: new FormControl(),
    });
  }
}
