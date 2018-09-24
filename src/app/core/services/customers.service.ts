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

  customersList$: ConnectableObservable<Customer[]>;
  passRequest: Subject<Observable<Customer[]>>;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.passRequest = new Subject();
    this.customersList$ = this.passRequest.pipe(
      mergeScan((acc) => acc ? Observable.of(acc) : this.getCustomersRequest(), null)
    ).publishReplay(1);
    this.customersList$.connect();
  }

  getCustomersRequest() {
    return this.httpClient.get<Customer[]>('customers');
  }

  getCustomers() {
    this.passRequest.next();
    return this.customersList$;
  }
}
