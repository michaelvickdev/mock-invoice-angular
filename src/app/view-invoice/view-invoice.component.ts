import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';


import { Invoice } from '../core/interfaces/invoice';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  invoice$;
  updatedInvoice$;
  currentInvoice$;
  invoiceItems$;
  columnsToDisplay: Array<string>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private invoicesService: InvoicesService,
      private customersService: CustomersService,
      private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.columnsToDisplay = ['number', 'product_name', 'quantity', 'price'];

    this.currentInvoice$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.invoicesService.invoicesCollection$.pipe(
          map(invoices => {
            return invoices.find(invoice => invoice.id === +params.get('id'));
          }),
        );
      })
    );
    this.invoiceItems$ = this.invoicesService.invoicesItemsList$;

    this.updatedInvoice$ = combineLatest(
      this.productsService.productsList$,
      this.invoiceItems$,
      this.currentInvoice$,
    ).pipe(
      map(([products, invoiceItems, currentInvoice]) => {
        currentInvoice.items = _.map(invoiceItems, item => {
          return {
            ...item,
            product: products.find(product => item.product_id === product.id),
          };
        });
        return currentInvoice;
      }),
    ).publishReplay(1);
    this.updatedInvoice$.connect();
  }
}
