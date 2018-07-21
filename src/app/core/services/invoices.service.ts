import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, mergeScan, switchMap, tap } from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import * as _ from 'lodash';

import { Invoice } from '../interfaces/invoice';
import { Product } from '../interfaces/product';
import { CustomersService } from './customers.service';


@Injectable()
export class InvoicesService {

  invoicesList$: ConnectableObservable<Invoice[]>;
  invoicesListCombined$: Observable<Invoice[]>;
  invoicesCollection$: ConnectableObservable<Invoice[]>;
  passRequest: Subject<Observable<Invoice[]>> = new Subject();
  deleteInvoice$: Subject<number> = new Subject();
  deleteInvoiceSubscription$: Observable<Invoice[]>;

  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,

  ) {
    this.invoicesList$ = this.passRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getInvoicesRequest(), null),
    ).publishReplay(1);
    this.invoicesList$.connect();

    this.invoicesListCombined$ = combineLatest(this.invoicesList$, this.customersService.customersList$).pipe(
      map(([invoices, customers]) => {
        return invoices.map(invoice => {
          return {
            ...invoice,
            customer: customers.find(customer => invoice.customer_id === customer.id),
          };
        });
      }),
    );

    this.deleteInvoiceSubscription$ = this.deleteInvoice$.pipe(
      switchMap(id => this.deleteInvoice(id))
    );

    this.invoicesCollection$ = Observable.merge(
      this.invoicesListCombined$,
      this.deleteInvoiceSubscription$,
    ).pipe(
      tap(console.log)
    ).publishReplay(1);
    this.invoicesCollection$.connect();
  }

  getInvoicesRequest() {
    return this.httpClient.get<Product[]>('invoices');
  }

  getInvoices() {
    this.passRequest.next();
    return this.invoicesList$;
  }

  deleteInvoice(id) {
    return this.httpClient.delete<Invoice>(`invoices/${id}`).pipe(
      switchMap(res => this.invoicesListCombined$.pipe(
        map(invoices => {
          const invoicesArray = invoices;
          invoicesArray.splice(_.indexOf(invoicesArray, res.id), 1);
          return invoicesArray;
        }),
      ))
    );
  }
}
