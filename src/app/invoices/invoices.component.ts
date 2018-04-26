import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

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

  invoicesList$: Observable<Invoice[]>;
  columnsToDisplay: Array<string>;

  constructor(
    private invoicesServices: InvoicesService,
    private customersServices: CustomersService,
    private headerService: HeaderService,
  ) {}

  ngOnInit() {
    this.columnsToDisplay = ['id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesList$ = combineLatest(this.invoicesServices.invoicesList$, this.customersServices.customersList$).pipe(
      map(([invoices, customers]) => {
        return invoices.map(invoice => {
          invoice.customer = customers.find(customer => invoice.customer_id === customer.id);
            return invoice;
        });
      })
    );
  }
  hideInkBar() {
    this.headerService.hideInkBar();
  }
}
