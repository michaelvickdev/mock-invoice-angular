import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import {
  distinctUntilChanged,
  map,
  publish,
  refCount,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Invoice } from '../interfaces/invoice';
import { InvoiceItem } from '../interfaces/invoice-item';

import { InvoiceModel } from '../models/invoice-model';
import { ProductModel } from '../models/product-model';
import { InvoiceItemModel } from '../models/invoice-item-model';

import { InvoicesService } from './invoices.service';
import { ProductsService } from './products.service';

@Injectable()
export class ViewCreateEditService {
  
  passCreateInvoiceRequest$: Subject<any> = new Subject();
  createInvoice$: Observable<Invoice>;
  
  passItemsRequest$: BehaviorSubject<string> = new BehaviorSubject(null);
  passViewEditCreateInvoice: Subject<Invoice> = new Subject();
  
  currentInvoice$: ConnectableObservable<Invoice>;
  invoiceWithItems$: Observable<Invoice>;
  viewCreateEditInvoice$: ConnectableObservable<Invoice>;
  
  constructor(
    private httpClient: HttpClient,
    private invoicesService: InvoicesService,
    private productsService: ProductsService,
  ) {
    // getting current invoice for the view page
    this.currentInvoice$ = this.passItemsRequest$.pipe(
      distinctUntilChanged(),
      switchMap(id => this.invoicesService.invoicesCollection$.pipe(
        map(invoices => invoices.find(invoice => invoice._id === id)))
      ),
    ).publishReplay(1);
    this.currentInvoice$.connect();
  
    // creating new invoice within invoice-items
    this.invoiceWithItems$ = this.passItemsRequest$.pipe(
      switchMap(id => id ? this.getInvoiceItemsRequest(id) : Observable.of([new InvoiceItemModel()])),
      switchMap(invoiceItems => this.productsService.productsList$.pipe(
        map(products => _.map(invoiceItems, item =>
          ({
            ...item,
            product: products.find(product => item.product_id === product._id) || new ProductModel(),
          }))
        )
      )),
      switchMap(items => this.currentInvoice$.pipe(
        map((currentInvoice = new InvoiceModel()) =>
          ({
            ...currentInvoice,
            items: [...items],
          })),
        tap(invoiceWithItems => this.passViewEditCreateInvoice.next(invoiceWithItems))
      )),
      publish(),
      refCount()
    );
    
    // main view-create-edit invoice stream
    this.viewCreateEditInvoice$ = this.passViewEditCreateInvoice
      .publishReplay(1);
    this.viewCreateEditInvoice$.connect();
    
    // prepare data to according format and save new invoice
    this.createInvoice$ = this.passCreateInvoiceRequest$.pipe(
      switchMap(data => {
        const invoiceItems = data.items.map(item =>
          ({
            product_id: item.product_id,
            quantity: item.quantity,
          }));
        const invoice = {
          _id: data._id,
          customer_id: data.customer_id,
          discount: +data.discount,
          total: +data.total,
          items: [...invoiceItems],
        };
        return invoice._id ? this.putInvoiceRequest(invoice) : this.postInvoiceRequest(invoice);
      }),
    );
  }
  
  getInvoiceItems(id: string) {
    console.log(id);
    this.passItemsRequest$.next(id);
    return this.invoiceWithItems$;
  }
  
  getInvoiceItemsRequest(id) {
    return this.httpClient.get<InvoiceItem[]>(`invoices/${id}/items`);
  }
  
  putInvoiceRequest(invoice) {
    return this.httpClient.put<Invoice>(`invoices/${invoice._id}`, invoice);
  }
  
  postInvoiceRequest(invoice) {
    return this.httpClient.post<Invoice>('invoices', invoice);
  }
}
