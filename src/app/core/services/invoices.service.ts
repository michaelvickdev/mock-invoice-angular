import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  distinctUntilChanged, filter,
  map, mapTo, mergeMap,
  mergeScan, publish, refCount,
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
import { InvoiceItemModel } from '../models/invoice-item-model';
import { ProductModel } from '../models/product-model';

import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';
import { ModalBoxService } from './modal-box.service';
import { InvoiceModel } from '../models/invoice-model';


@Injectable()
export class InvoicesService {
  
  passInvoiceRequest: Subject<Observable<Invoice[]>> = new Subject();
  invoicesList$: ConnectableObservable<Invoice[]>;
  invoicesListCombined$: Observable<Invoice[]>;
  invoicesCollection$: ConnectableObservable<Invoice[]>;

  passItemsRequest$: BehaviorSubject<number> = new BehaviorSubject(null);
  passViewEditCreateInvoice: Subject<Invoice> = new Subject();
  currentInvoice$: ConnectableObservable<Invoice>;
  
  invoiceWithItems$: Observable<Invoice>;
  viewCreateEditInvoice$: ConnectableObservable<Invoice>;
  
  passCreateInvoiceRequest$: Subject<any> = new Subject();
  createInvoice$: Observable<Invoice>;
  
  addInvoice$: Subject<{}> = new Subject();
  addInvoiceCollection$: Observable<any>;

  deleteInvoice$: Subject<number> = new Subject();
  deleteInvoiceOpenModal$: Subject<number> = new Subject();
  deleteInvoiceCollection$: Observable<Invoice[]>;
  deleteInvoiceModal$: ConnectableObservable<Invoice>;
  
  constructor(
    private httpClient: HttpClient,
    private customersService: CustomersService,
    private productsService: ProductsService,
    private modalBoxService: ModalBoxService,
  ) {
    // getting initial invoices collection
    this.invoicesList$ = this.passInvoiceRequest.pipe(
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
  
    // prepare data to according format and save new invoice
    this.createInvoice$ = this.passCreateInvoiceRequest$.pipe(
      switchMap(data => {
        const invoiceItems = data.items.map(item =>
          ({
            product_id: item.product_id,
            quantity: item.quantity,
          }));
        const invoice = {
          customer_id: data.customer_id,
          discount: data.discount,
          total: data.total,
          items: [...invoiceItems],
        };
        return this.postInvoiceRequest(invoice);
      }),
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
  
    // getting current invoice for the view page
    this.currentInvoice$ = this.passItemsRequest$.pipe(
      distinctUntilChanged(),
      switchMap(id => this.invoicesCollection$.pipe(
        map(invoices => invoices.find(invoice => invoice.id === id)))
      ),
    ).publishReplay(1);
    this.currentInvoice$.connect();
    
    // main view invoice stream
    this.invoiceWithItems$ = this.passItemsRequest$.pipe(
      tap(res => console.error('inside view', res)),
      distinctUntilChanged(),
      switchMap(id => id ? this.getInvoiceItemsRequest(id) : Observable.of([new InvoiceItemModel()])),
      switchMap(invoiceItems => this.productsService.productsList$.pipe(
        map(products => _.map(invoiceItems, item =>
          ({
            ...item,
            product: products.find(product => item.product_id === product.id) || new ProductModel(),
          }))
        )
      )),
      switchMap(items => this.currentInvoice$.pipe(
        map((currentInvoice = new InvoiceModel()) =>
          ({
            ...currentInvoice,
            items: [...items],
          })),
        tap(invoice => this.passViewEditCreateInvoice.next(invoice))
      )),
      publish(),
      refCount()
    );
  
    this.viewCreateEditInvoice$ = this.passViewEditCreateInvoice
      .publishReplay(1);
    this.viewCreateEditInvoice$.connect();
  }

  getInvoicesRequest() {
    return this.httpClient.get<Invoice[]>('invoices');
  }

  getInvoiceItemsRequest(id) {
    return this.httpClient.get<InvoiceItem[]>(`invoices/${id}/items`);
  }

  getInvoices() {
    this.passInvoiceRequest.next();
    return this.invoicesList$;
  }

  getInvoiceItems(id: number) {
    this.passItemsRequest$.next(id);
    return this.invoiceWithItems$;
  }

  postInvoiceRequest(invoice) {
    return this.httpClient.post<Invoice>('invoices', invoice);
  }

  deleteInvoiceRequest(id) {
    return this.httpClient.delete<Invoice>(`invoices/${id}`).pipe(
      tap(deletedInvoice => this.deleteInvoice$.next(deletedInvoice.id))
    );
  }
}
