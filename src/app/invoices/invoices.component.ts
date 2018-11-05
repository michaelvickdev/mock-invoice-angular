import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../core/interfaces/invoice';

import { InvoicesService } from '../core/services/invoices.service';


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
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesCollection$ = this.invoicesService.invoicesCollection$;
  }

  hideInkBar() {
  
  }

  deleteInvoice(id) {
    this.invoicesService.deleteInvoiceOpenModal$.next(id);
  }
}
