import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { mergeScan} from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';

import { Invoice } from '../interfaces/invoice';
import { Product } from '../interfaces/product';


@Injectable()
export class InvoicesService {

  invoicesList$: ConnectableObservable<Invoice[]>;
  passRequest: Subject<Observable<Invoice[]>>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.passRequest = new Subject();
    this.invoicesList$ = this.passRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getInvoicesRequest(), null)
    ).publishReplay(1);
    this.invoicesList$.connect();
  }

  getInvoicesRequest() {
    return this.httpClient.get<Product[]>('invoices');
  }

  getInvoices() {
    this.passRequest.next();
    return this.invoicesList$;
  }

  getInvoice(id) {
    return this.httpClient.get<Invoice[]>(`invoices/${id}`);
  }
}
