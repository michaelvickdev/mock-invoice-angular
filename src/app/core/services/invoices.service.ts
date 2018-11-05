import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  filter,
  map,
  mapTo,
  mergeMap,
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

import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';
import { ModalBoxService } from './modal-box.service';

@Injectable()
export class InvoicesService {
  
  passInvoicesRequest: Subject<any> = new Subject();
  invoicesList$: ConnectableObservable<Invoice[]>;
  invoicesListCombined$: Observable<Invoice[]>;
  invoicesCollection$: ConnectableObservable<Invoice[]>;
  
  addInvoice$: Subject<Invoice> = new Subject();
  addInvoiceCollection$: Observable<any>;

  deleteInvoice$: Subject<number> = new Subject();
  deleteInvoiceOpenModal$: Subject<number> = new Subject();
  deleteInvoiceCollection$: Observable<Invoice[]>;
  deleteInvoiceModal$: ConnectableObservable<Invoice>;
  
  hideNavInkBar$: Subject<any> = new Subject();
  
  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,
    private productsService: ProductsService,
    private modalBoxService: ModalBoxService,
  ) {
    // getting initial invoices collection
    this.invoicesList$ = this.passInvoicesRequest.pipe(
      mergeScan(acc => acc ? Observable.of(acc) : this.getInvoicesRequest(), null),
    ).publishReplay(1);
    this.invoicesList$.connect();
    
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

    // open delete invoice modal window and by success send a delete request to DB
    this.deleteInvoiceModal$ = this.deleteInvoiceOpenModal$.pipe(
      mergeMap(id => this.modalBoxService.confirmModal('Are you sure you want to delete an invoice?').pipe(
        filter(choice => !!choice),
        mapTo(id)
      )),
      switchMap(id => this.deleteInvoiceRequest(id)),
      tap(invoices => this.modalBoxService.confirmModal(`Invoice number ${invoices.id} has been deleted`, false)),
    ).publishReplay(1);
    this.deleteInvoiceModal$.connect();

    // main invoices collection to display
    this.invoicesCollection$ = Observable.merge(
      this.invoicesListCombined$.pipe(take(1)),
      this.addInvoiceCollection$,
      this.deleteInvoiceCollection$,
    ).publishReplay(1);
    this.invoicesCollection$.connect();
  }

  getInvoicesRequest() {
    return this.httpClient.get<Invoice[]>('invoices');
  }

  getInvoices() {
    this.passInvoicesRequest.next();
    return this.invoicesList$;
  }

  deleteInvoiceRequest(id) {
    return this.httpClient.delete<Invoice>(`invoices/${id}`).pipe(
      tap(deletedInvoice => this.deleteInvoice$.next(deletedInvoice.id))
    );
  }
}
