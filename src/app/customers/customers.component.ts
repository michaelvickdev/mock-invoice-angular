import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Customer } from '../core/interfaces/customer';
import { CustomersService } from '../core/services/customers.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  customersList$: Observable<Customer[]>;
  columnsToDisplay: Array<string>;

  constructor(
    private customersServices: CustomersService
  ) {}

  ngOnInit() {
    this.columnsToDisplay = ['id', 'customer_name', 'address', 'phone'];

    this.customersList$ = this.customersServices.customersList$.pipe(
      map(customer => customer)
    );
  }
}
