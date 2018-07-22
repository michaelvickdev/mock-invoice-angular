import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { InvoiceItem } from '../interfaces/invoice-item';
import { InvoicesService } from '../services/invoices.service';

@Injectable()
export class ViewInvoiceResolver implements Resolve<InvoiceItem[]> {

  constructor(private invoicesService: InvoicesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      this.invoicesService.getInvoiceItems(+route.paramMap.get('id')).pipe(
        take(1)
      );
  }
}
