import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';
import { Observable } from 'rxjs/Observable';

import { Invoice } from '../core/interfaces/invoice';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  invoice$: Observable<Invoice>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private invoicesService: InvoicesService,
      private customersService: CustomersService,
      private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.invoice$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.invoicesService.invoicesList$.pipe(
          map(invoices => {
            return invoices.find(invoice => invoice.id === +params.get('id'));
          }));
      })
    );
  }

  getCombinedData(id) {
    this.invoicesService.getInvoices();
  }
}
