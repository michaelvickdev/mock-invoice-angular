import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { shareReplay } from 'rxjs/operators';

import { Customer } from '../interfaces/customer';


@Injectable()
export class CustomersService {

  customersList$: Observable<Customer[]>;

  constructor( private httpClient: HttpClient ) {}

  getCustomers() {
    return this.customersList$ = this.httpClient.get<Customer[]>('customers').pipe(
      shareReplay(1)
    );
  }
  getCustomer(id) {
      return this.httpClient.get<Customer[]>(`customers/${id}`);
  }
}
