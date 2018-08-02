import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  editInvoice: FormGroup;

  constructor(
  ) {
  }

  ngOnInit() {
    this.editInvoice = new FormGroup({
      name: new FormControl(),
      product: new FormControl(),
      quantity: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      total: new FormControl(),
    });
  }
}
