import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  navItems: {
    path: string,
    label: string
  }[];

  ngOnInit() {
    this.navItems = [
      { path: '/products', label: 'Products' },
      { path: '/customers', label: 'Customers'},
      { path: '/invoices', label: 'Invoices'},
    ];
  }
}
