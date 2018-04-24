import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(
    private invoicesServices: InvoicesService,
    private customersServices: CustomersService
  ) {
  }
  invoicesList$: Observable<any>;
  columnsToDisplay: Array<string>;

  ngOnInit() {
    this.columnsToDisplay = ['id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesList$ = combineLatest(this.invoicesServices.getInvoices(), this.customersServices.getCustomers())
      .map(([invoices, customers]) => {
        return invoices.map(invoice => {
          invoice.customer_name = customers.find(customer => invoice.customer_id === customer.id);
            return invoice;
        });
      });
  }
}
