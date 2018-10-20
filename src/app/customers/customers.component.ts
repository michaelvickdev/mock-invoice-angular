import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../core/interfaces/customer';

import { CustomersService } from '../core/services/customers.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  columnsToDisplay: Array<string>;
  customersList$: Observable<Customer[]>;

  constructor(
    private customersServices: CustomersService
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'customer_name', 'address', 'phone'];

    this.customersList$ = this.customersServices.customersList$;
  }
}
