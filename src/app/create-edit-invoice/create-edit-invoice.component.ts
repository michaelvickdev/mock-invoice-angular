import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { Customer } from '../core/interfaces/customer';
import { Product } from '../core/interfaces/product';
import { Invoice } from '../core/interfaces/invoice';
import { InvoiceItemModel } from '../core/models/invoice-item-model';

import { CustomersService } from '../core/services/customers.service';
import { ProductsService } from '../core/services/products.service';
import { InvoicesService } from '../core/services/invoices.service';


@Component({
  selector: 'app-create-edit-invoice',
  templateUrl: './create-edit-invoice.component.html',
  styleUrls: ['./create-edit-invoice.component.scss']
})
export class CreateEditInvoiceComponent implements OnInit, OnDestroy {

  createInvoiceForm: FormGroup;
  
  customersList$: Observable<Customer[]>;
  productsList$: Observable<Product[]>;
  viewCreateEditInvoice$: Observable<Invoice>;
  invoiceId$: Observable<number>;
  
  saveInvoiceSubscription: Subscription;
  createEditInvoiceSubscription: Subscription;
  totalControlSubscription: Subscription;
  
  constructor(
    private customerService: CustomersService,
    private productsService: ProductsService,
    private invoicesService: InvoicesService,
    private route: ActivatedRoute,
  ) {
  }

  get createInvoiceItemsArray() {
    return this.createInvoiceForm.get('items') as FormArray;
  }
  get createInvoiceDiscountControl() {
    return this.createInvoiceForm.get('discount');
  }
  get createInvoiceTotalControl() {
    return this.createInvoiceForm.get('total');
  }

  ngOnInit() {
    this.createInvoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      discount: new FormControl(null),
      total: new FormControl(),
      items: new FormArray([]),
    });
    
    // main stream for creating form with values for both create & edit mode
    this.createEditInvoiceSubscription = this.invoicesService.viewCreateEditInvoice$
      .subscribe((invoice: Invoice) => {
        this.createInvoiceForm.patchValue(invoice);
        invoice.items.forEach(item =>  this.addItemGroup(item));
      });
  
    this.customersList$ = this.customerService.customersList$;
    this.productsList$ = this.productsService.productsList$;
    this.viewCreateEditInvoice$ = this.invoicesService.viewCreateEditInvoice$;
  
    this.invoiceId$ = combineLatest(
      this.route.data,
      this.invoicesService.invoicesList$,
      this.viewCreateEditInvoice$
    ).pipe(
      map(([data, invoices, invoice]) => data['type'] === 'create' ? invoices[invoices.length - 1].id + 1 : invoice.id)
    );
    
    // count the total amount of the invoice based on products and discount
    this.totalControlSubscription = Observable.merge(
      this.createInvoiceItemsArray.valueChanges,
      this.createInvoiceDiscountControl.valueChanges,
    ).pipe(
      filter(() => !!this.createInvoiceItemsArray.value.find(item => item.price)),
      map(() => {
        if (this.createInvoiceItemsArray.length) {
          const totalOfArray = this.createInvoiceItemsArray.value.reduce((acc, item) => acc + item.quantity * item.price, 0);
          return (totalOfArray - totalOfArray * this.createInvoiceDiscountControl.value * 0.01).toFixed(2);
        }
        return 0;
      }),
    ).subscribe(total => this.createInvoiceTotalControl.patchValue(total));
    
    this.saveInvoiceSubscription = this.invoicesService.createInvoice$
      .subscribe(newInvoice => this.invoicesService.addInvoice$.next(newInvoice));
  }

  onSubmit() {
    this.invoicesService.passCreateInvoiceRequest$.next(this.createInvoiceForm.value);
  }
  
  addItemGroup(item = new InvoiceItemModel()) {
    this.createInvoiceItemsArray.push(this.addItemGroups(item));
  }

  addItemGroups(item: InvoiceItemModel) {
    return new FormGroup({
      product_id: new FormControl(item.product_id, Validators.required),
      quantity: new FormControl(item.quantity, Validators.required),
      price: new FormControl(item.product.price),
    });
  }
  
  deleteItemsGroup(index: number) {
    this.createInvoiceItemsArray.removeAt(index);
  }

  ngOnDestroy() {
    this.totalControlSubscription.unsubscribe();
    this.saveInvoiceSubscription.unsubscribe();
    this.createEditInvoiceSubscription.unsubscribe();
  }
}
