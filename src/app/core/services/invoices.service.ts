import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { shareReplay } from 'rxjs/operators';

import { Invoice } from '../interfaces/invoice';


@Injectable()
export class InvoicesService {

  invoicesList$: Observable<Invoice[]>;

  constructor( private httpClient: HttpClient ) {}

  getInvoices() {
    return this.invoicesList$ = this.httpClient.get<Invoice[]>('invoices').pipe(
      shareReplay(1)
    );
  }
  getInvoice(id) {
    return this.httpClient.get<Invoice[]>(`invoices/${id}`);
  }
}
