import { AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { MatTabLink } from '@angular/material';

import { InvoicesService } from '../services/invoices.service';
import { HeaderService } from '../services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  invoicesTotalAmount;
  invoicesAmount$: Subscription;
  navItems: {
    path: string,
    label: string
  }[];
  @ViewChildren(MatTabLink) inkBar: QueryList<any>;

  constructor(
    private invoicesServices: InvoicesService,
    private headerService: HeaderService,
    private renderer: Renderer2,
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

  ngAfterViewInit() {
    this.headerService.inkBar = this.inkBar;
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }
}
