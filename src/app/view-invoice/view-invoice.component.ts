import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../core/interfaces/invoice';

import { ViewCreateEditService } from '../core/services/view-create-edit.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  columnsToDisplay: Array<string>;
  viewInvoice$: Observable<Invoice>;

  constructor(
    private viewCreateEditService: ViewCreateEditService,
  ) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['number', 'product_name', 'quantity', 'price'];

    this.viewInvoice$ = this.viewCreateEditService.viewCreateEditInvoice$;
  }
}
