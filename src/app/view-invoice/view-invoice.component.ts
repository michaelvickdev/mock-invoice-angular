import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';
import * as _ from 'lodash';

import { InvoiceItem } from '../core/interfaces/invoice-item';
import { Invoice } from '../core/interfaces/invoice';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  updatedInvoice$: Observable<Invoice>;
  currentInvoice$: Observable<Invoice>;
  invoiceItems$: Observable<InvoiceItem[]>;
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
        return this.invoicesService.invoicesListCombined$.pipe(
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
        const items = _.map(invoiceItems, item => {
          return {
            ...item,
            product: products.find(product => item.product_id === product.id),
          };
        });
        return {
          ...currentInvoice,
          items: [...items],
        };
      }),
    );
  }
}
