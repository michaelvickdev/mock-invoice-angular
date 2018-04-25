import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Customer } from '../interfaces/customer';


@Injectable()
export class CustomersService {

  constructor( private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get<Customer[]>('customers');
  }
}
