import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { filter, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';

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
  columnsToDisplay: Array<string>;

  invoicesCollection$: Observable<Invoice[]>;
  deleteInvoice$: Subject<any> = new Subject<any>();
  deleteInvoiceSubscription: Subscription;

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
      mergeMap(id => this.modalBoxService.confirmModal('Are you sure you want to delete an invoice?').pipe(
          filter(choice => !!choice),
          mapTo(id)
        )
      ),
      switchMap(id => this.invoicesService.deleteInvoiceRequest(id)),
      tap(invoices => this.modalBoxService.confirmModal(`Invoice number ${invoices.id} has been deleted`, false)),
    ).subscribe();
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }

  deleteInvoice(id) {
    this.deleteInvoice$.next(id);
  }
}
