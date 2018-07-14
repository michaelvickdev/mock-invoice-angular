import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { Customer } from '../interfaces/customer';
import { CustomersService } from '../services/customers.service';

@Injectable()
export class CustomersResolver implements Resolve<Customer[]> {
  constructor(private customersService: CustomersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      return this.customersService.getCustomers().pipe(
        take(1)
      );
  }
}
