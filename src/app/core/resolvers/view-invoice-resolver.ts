import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { InvoiceItem } from '../interfaces/invoice-item';

import { ViewCreateEditService } from '../services/view-create-edit.service';

@Injectable()
export class ViewInvoiceResolver implements Resolve<InvoiceItem[]> {

  constructor(
    private viewCreateEditService: ViewCreateEditService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      return this.viewCreateEditService.getInvoiceItems(+route.paramMap.get('id')).pipe(
        take(1)
      );
  }
}
