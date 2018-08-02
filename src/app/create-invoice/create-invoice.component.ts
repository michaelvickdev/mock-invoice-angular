import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  newInvoice: FormGroup;

  constructor(
  ) {
  }

  ngOnInit() {
    this.newInvoice = new FormGroup({
      name: new FormControl(),
      product: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      total: new FormControl(),
    });
  }
}
