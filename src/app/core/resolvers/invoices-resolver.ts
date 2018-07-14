import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { Invoice } from '../interfaces/invoice';
import { InvoicesService } from '../services/invoices.service';

@Injectable()
export class InvoicesResolver implements Resolve<Invoice[]> {

  constructor(private invoicesService: InvoicesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      this.invoicesService.getInvoices().pipe(
        take(1)
      );
  }
}
