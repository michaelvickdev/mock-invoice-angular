import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  distinctUntilChanged,
  map,
  mergeScan,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

import { Invoice } from '../interfaces/invoice';
import { InvoiceItem } from '../interfaces/invoice-item';

import { CustomersService } from './customers.service';

@Injectable()
export class InvoicesService {

  passRequest: Subject<Observable<Invoice[]>> = new Subject();
  invoicesList$: ConnectableObservable<Invoice[]>;
  invoicesListCombined$: Observable<Invoice[]>;
  invoicesCollection$: ConnectableObservable<Invoice[]>;

  passItemsRequest: Subject<Observable<InvoiceItem[]>> = new Subject();
  invoicesItemsList$: ConnectableObservable<InvoiceItem[]>;

  addInvoice$: Subject<{}> = new Subject();
  addInvoiceCollection$: Observable<any>;
  deleteInvoice$: Subject<number> = new Subject();
  deleteInvoiceCollection$: Observable<Invoice[]>;

  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,

  ) {
    // getting initial invoices collection
    this.invoicesList$ = this.passRequest.pipe(
      mergeScan(acc => acc ? Observable.of(acc) : this.getInvoicesRequest(), null),
    ).publishReplay(1);
    this.invoicesList$.connect();

    // getting initial invoice-items collection
    this.invoicesItemsList$ = this.passItemsRequest.pipe(
      distinctUntilChanged(),
      switchMap(id => this.getInvoiceItemsRequest(id)),
    ).publishReplay(1);
    this.invoicesItemsList$.connect();

    // adding customer info to initial invoices collection
    this.invoicesListCombined$ = combineLatest(
      this.invoicesList$,
      this.customersService.customersList$.pipe(take(1))
    ).pipe(
      map(([invoices, customers]) => invoices.map(invoice =>
        ({
          ...invoice,
          customer: customers.find(customer => invoice.customer_id === customer.id),
        }))
      ),
    );

    // add a new invoice to a collection
    this.addInvoiceCollection$ = this.addInvoice$.pipe(
      switchMap(newInvoice => this.invoicesCollection$.pipe(
        take(1),
        withLatestFrom(this.customersService.customersList$),
        map(([invoices, customers]) =>
          [
            ...invoices,
            {...newInvoice, customer: customers.find(customer => newInvoice['customer_id'] === customer.id)},
          ]
        ),
      ))
    );

    // delete an invoice invoice from collection
    this.deleteInvoiceCollection$ = this.deleteInvoice$.pipe(
      switchMap(id => this.invoicesCollection$.pipe(
        take(1),
        map(invoices => invoices.filter(invoice => invoice.id !== id))
      ))
    );

    // main invoices collection to display
    this.invoicesCollection$ = Observable.merge(
      this.invoicesListCombined$.pipe(take(1)),
      this.addInvoiceCollection$,
      this.deleteInvoiceCollection$,
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

  deleteInvoiceRequest(id) {
    return this.httpClient.delete<Invoice>(`invoices/${id}`).pipe(
      tap(res => this.deleteInvoice$.next(res.id))
    );
  }
}
