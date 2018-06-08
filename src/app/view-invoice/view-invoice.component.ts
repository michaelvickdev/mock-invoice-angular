import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { InvoicesService } from '../core/services/invoices.service';
import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private invoicesService: InvoicesService,
      private customersService: CustomersService,
      private productsService: ProductsService
  ) {}

  ngOnInit() {

  }

  getCombinedData(id) {
    this.invoicesService.getInvoice(id);
  }
}
