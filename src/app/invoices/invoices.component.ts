import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../core/interfaces/invoice';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { HeaderService } from '../core/services/header.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  columnsToDisplay: Array<string>;
  invoicesCollection$: Observable<Invoice[]>;

  constructor(
    private invoicesService: InvoicesService,
    private customersService: CustomersService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesCollection$ = this.invoicesService.invoicesCollection$;
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }

  deleteInvoice(id) {
    this.invoicesService.deleteInvoiceOpenModal$.next(id);
  }
}
