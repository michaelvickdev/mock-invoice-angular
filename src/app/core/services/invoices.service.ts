import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoices } from '../interfaces/invoices';

@Injectable()

export class InvoicesService {

  constructor(private httpClient: HttpClient) {
  }

  getInvoices() {
    return this.httpClient.get<Invoices[]>('http://api.invoice-app.2muchcoffee.com/api/invoices');
  }
}
