import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  distinctUntilChanged,
  map,
  mergeScan, startWith,
  switchMap,
  switchMapTo,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import * as _ from 'lodash';

import { Invoice } from '../interfaces/invoice';
import { InvoiceItem } from '../interfaces/invoice-item';
import { CustomersService } from './customers.service';

@Injectable()
export class InvoicesService {

  passRequest: Subject<Observable<Invoice[]>> = new Subject();
  invoicesList$: ConnectableObservable<Invoice[]>;
  invoicesListCombined$: Observable<Invoice[]>;
  invoicesCollection$: ConnectableObservable<Invoice[]>;
  initialCollection$: Observable<Invoice[]>;

  passItemsRequest: Subject<Observable<InvoiceItem[]>> = new Subject();
  invoicesItemsList$: ConnectableObservable<InvoiceItem[]>;

  addInvoice$: Subject<{}> = new Subject();
  addInvoiceSubscription$: Observable<any>;
  deleteInvoice$: Subject<number> = new Subject();
  deleteInvoiceSubscription$: Observable<Invoice[]>;

  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,

  ) {
    // getting initial invoices collection
    this.invoicesList$ = this.passRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getInvoicesRequest(), null),
    ).publishReplay(1);
    this.invoicesList$.connect();

    // getting initial invoice-items collection
    this.invoicesItemsList$ = this.passItemsRequest.pipe(
      distinctUntilChanged(),
      switchMap((id) => {
        return this.getInvoiceItemsRequest(id);
      })
    ).publishReplay(1);
    this.invoicesItemsList$.connect();

    // adding customer info to initial invoices collection
    this.invoicesListCombined$ = combineLatest(
      this.invoicesList$,
      this.customersService.customersList$.pipe(take(1))
    ).pipe(
      map(([invoices, customers]) => {
        console.error(222, invoices);
        return invoices.map(invoice => {
          return {
            ...invoice,
            customer: customers.find(customer => invoice.customer_id === customer.id),
          };
        });
      }),
    );

    this.initialCollection$ = Observable.merge(
      this.invoicesListCombined$.pipe(take(1)),
    );

    this.addInvoiceSubscription$ = this.addInvoice$.pipe(
      withLatestFrom(this.initialCollection$, this.customersService.customersList$),
      map(([newInvoice, invoices, customers]) => {
        return [
          ...invoices,
          {...newInvoice, customer: customers.find(customer => newInvoice['customer_id'] === customer.id)}
        ];
      }),
    );

    this.deleteInvoiceSubscription$ = this.deleteInvoice$.pipe(
      withLatestFrom(this.initialCollection$),
      map(([id, invoices]) => {
        const invoiceToDelete = _.find(invoices, ['id', id]);
        invoices.splice(_.indexOf(invoices, invoiceToDelete), 1);
        console.log(111, invoices, id);
        return invoices.map(invoice => {
          return {...invoice};
        });
      }),
    );

    // main invoices collection to display
    this.invoicesCollection$ = Observable.merge(
      this.initialCollection$,
      this.deleteInvoiceSubscription$,
      this.addInvoiceSubscription$,
    )
    .publishReplay(1);
    this.invoicesCollection$.connect();
  }

  getInvoicesRequest() {
    return this.httpClient.get<Invoice[]>('invoices');
  }

  getInvoiceItemsRequest(id) {
    return this.httpClient.get<InvoiceItem[]>(`invoices/${id}/items`);
  }

  getInvoices() {
    this.passRequest.next();
    return this.invoicesList$;
  }

  getInvoiceItems(id) {
    this.passItemsRequest.next(id);
    return this.invoicesItemsList$;
  }

  postInvoiceRequest(invoice) {
    return this.httpClient.post<Invoice>('invoices', invoice);
  }

  deleteInvoice(id) {
    return this.httpClient.delete<Invoice>(`invoices/${id}`).pipe(
      map(res => this.deleteInvoice$.next(res.id))
    );
  }
}
