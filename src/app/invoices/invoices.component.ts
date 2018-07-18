import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, switchMap, mergeAll, tap } from 'rxjs/operators';

import { Invoice } from '../core/interfaces/invoice';
import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { HeaderService } from '../core/services/header.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';



@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoicesList$;
  deleteInvoice$;
  invoicesListData$: Observable<Invoice[]>;
  deleteCurrentInvoice$: Subject<number> = new Subject();
  columnsToDisplay: Array<string>;

  constructor(
    private invoicesServices: InvoicesService,
    private customersServices: CustomersService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesListData$ = combineLatest(this.invoicesServices.invoicesList$, this.customersServices.customersList$).pipe(
      map(([invoices, customers]) => {
        return invoices.map(invoice => {
          invoice.customer = customers.find(customer => invoice.customer_id === customer.id);
          return invoice;
        });
      }),
    );

    this.deleteInvoice$ = this.deleteCurrentInvoice$.pipe(
      switchMap(id => this.invoicesServices.deleteInvoice(id))
    );

    this.invoicesList$ = Observable.merge(
      this.invoicesListData$,
      this.deleteInvoice$,
    );
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }
  deleteInvoice(id) {
    this.deleteCurrentInvoice$.next(id);
  }
}
