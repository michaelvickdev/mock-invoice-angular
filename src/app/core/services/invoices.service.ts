import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from '../interfaces/invoice';


@Injectable()
export class InvoicesService {

  constructor(private httpClient: HttpClient) {}

  getInvoices() {
    return this.httpClient.get<Invoice[]>('invoices');
  }
}
