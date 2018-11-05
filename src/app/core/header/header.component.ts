import { Component, OnInit, QueryList, ViewChildren, } from '@angular/core';

import { MatTabLink } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Invoice } from '../interfaces/invoice';

import { InvoicesService } from '../services/invoices.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @ViewChildren(MatTabLink) inkBar: QueryList<any>;
  
  invoicesAmount$: Observable<Invoice[]>;
  navItems: { path: string, label: string }[] = [
    { path: '/products', label: 'Products' },
    { path: '/customers', label: 'Customers'},
    { path: '/invoices', label: 'Invoices'},
  ];

  constructor(
    private invoicesService: InvoicesService,
  ) {
  }

  ngOnInit() {
    this.invoicesAmount$ = this.invoicesService.invoicesCollection$;
  }

  hideInkBar() {
    this.inkBar.last._elementRef.nativeElement.nextElementSibling.style.visibility = 'hidden' ;
  }
}
