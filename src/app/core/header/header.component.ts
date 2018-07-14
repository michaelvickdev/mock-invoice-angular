import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { MatTabLink } from '@angular/material';

import { InvoicesService } from '../services/invoices.service';
import { HeaderService } from '../services/header.service';
import { Observable } from 'rxjs/Observable';

import { Invoice } from '../interfaces/invoice';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  invoicesAmount$: Observable<Invoice[]>;
  navItems: {
    path: string,
    label: string,
  }[];
  @ViewChildren(MatTabLink) inkBar: QueryList<any>;

  constructor(
    private invoicesService: InvoicesService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.navItems = [
      { path: '/products', label: 'Products' },
      { path: '/customers', label: 'Customers'},
      { path: '/invoices', label: 'Invoices'},
    ];

    this.invoicesAmount$ = this.invoicesService.invoicesList$;
  }

  ngAfterViewInit() {
    this.headerService.inkBar = this.inkBar;
  }

  hideInkBar() {
    this.headerService.hideInkBar();
  }
}
