import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import { Invoice } from '../core/interfaces/invoice';
import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { HeaderService } from '../core/services/header.service';
import { ModalBoxService } from '../core/services/modal-box.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoicesCollection$: Observable<Invoice[]>;
  columnsToDisplay: Array<string>;
  deleteInvoiceSubscription: Subscription;
  deleteInvoice$: Subject<any> = new Subject<any>();

  constructor(
    private invoicesService: InvoicesService,
    private customersService: CustomersService,
    private headerService: HeaderService,
    private modalBoxService: ModalBoxService,
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'id', 'customer_name', 'discount', 'total', 'actions'];

    this.invoicesCollection$ = this.invoicesService.invoicesCollection$;

    this.deleteInvoiceSubscription = this.deleteInvoice$.pipe(
      mergeMap((id) => {
        return this.modalBoxService.confirmModal('Do you want to delete an invoice?').pipe(
          filter((choice) => choice),
          mapTo(id)
        );
      }),
      switchMap((id) => this.invoicesService.deleteInvoice(id))
    ).subscribe((invoices) => {
      this.modalBoxService.confirmModal(`Invoice number ${invoices} was deleted`, false);
    });
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }

  deleteInvoice(id) {
    this.deleteInvoice$.next(id);
  }
}
