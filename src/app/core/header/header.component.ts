import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { InvoicesService } from '../services/invoices.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  invoicesTotalAmount: number;
  invoicesAmount$: Subscription;
  navItems: {
    path: string,
    label: string
  }[];

  constructor(
    private invoicesServices: InvoicesService,
  ) {}


  ngOnInit() {
    this.navItems = [
      { path: '/products', label: 'Products' },
      { path: '/customers', label: 'Customers'},
      { path: '/invoices', label: 'Invoices'},
    ];

    this.invoicesAmount$ = this.invoicesServices.getInvoices()
      .subscribe(invoices => this.invoicesTotalAmount = invoices.length);
  }
}
