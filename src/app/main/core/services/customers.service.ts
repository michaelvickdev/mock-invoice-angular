import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Customers } from '../interfaces/customers';

@Injectable()

export class CustomersService {
  
  constructor( private httpClient: HttpClient) {}
  
  getCustomers() {
      return this.httpClient.get<Customers[]>('http://api.invoice-app.2muchcoffee.com/api/customers');
  }
}
