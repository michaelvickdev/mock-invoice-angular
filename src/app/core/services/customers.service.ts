import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { mergeScan} from 'rxjs/operators';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';

import { Customer } from '../interfaces/customer';


@Injectable()
export class CustomersService {
  
  passCustomersRequest: Subject<any> = new Subject();
  customersList$: ConnectableObservable<Customer[]>;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.customersList$ = this.passCustomersRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getCustomersRequest(), null)
    ).publishReplay(1);
    this.customersList$.connect();
  }

  getCustomersRequest() {
    return this.httpClient.get<Customer[]>('customers');
  }

  getCustomers() {
    this.passCustomersRequest.next();
    return this.customersList$;
  }
}
