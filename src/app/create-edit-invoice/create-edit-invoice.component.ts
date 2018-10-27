import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { map, filter, switchMap, tap } from 'rxjs/operators';

import { Customer } from '../core/interfaces/customer';
import { Product } from '../core/interfaces/product';
import { Invoice } from '../core/interfaces/invoice';

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
  invoicesList$: Observable<Invoice[]>;

  totalControlSubscription: Subscription;
  createInvoiceSubscription: Subscription;

  passCreateInvoiceRequest$: Subject<any> = new Subject();

  constructor(
    private customerService: CustomersService,
    private productsService: ProductsService,
    private invoicesService: InvoicesService,
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
    this.customersList$ = this.customerService.customersList$;
    this.productsList$ = this.productsService.productsList$;
    this.invoicesList$ = this.invoicesService.invoicesCollection$;

    this.createInvoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      discount: new FormControl(null),
      total: new FormControl(),
      items: new FormArray([]),
    });
  
    this.addItemsGroup();
  
    // count the total amount of the invoice based on products and discount
    this.totalControlSubscription = Observable.merge(
      this.createInvoiceItemsArray.valueChanges,
      this.createInvoiceDiscountControl.valueChanges,
    ).pipe(
      filter(() => !!this.createInvoiceItemsArray.value.find(item => item.price)),
      map(() => this.createInvoiceItemsArray.length ?
        this.createInvoiceItemsArray.value.reduce((acc, item) => acc + +item.quantity * +item.price, 0) : 0
      ),
      map(totalOfArray => {
        return (totalOfArray - totalOfArray * this.createInvoiceDiscountControl.value * 0.01).toFixed(2);
      }),
    ).subscribe(total => this.createInvoiceTotalControl.patchValue(total));
    
    // prepare data to according format and save new invoice
    this.createInvoiceSubscription = this.passCreateInvoiceRequest$.pipe(
      switchMap(data => {
        const invoiceItems = data.items.map(item =>
          ({
          product_id: item.product_id,
          quantity: item.quantity,
        }));
        const invoice = {
          customer_id: data.customer_id,
          discount: data.discount,
          total: data.total,
          items: [...invoiceItems],
        };
        return this.invoicesService.postInvoiceRequest(invoice);
      }),
    ).subscribe(newInvoice => this.invoicesService.addInvoice$.next(newInvoice));
  }

  onSubmit() {
    this.passCreateInvoiceRequest$.next(this.createInvoiceForm.value);
  }

  addItemsGroup() {
    this.createInvoiceItemsArray.push(
       new FormGroup({
        product_id: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        price: new FormControl(null),
      })
    );
  }
  
  deleteItemsGroup(index: number) {
    this.createInvoiceItemsArray.removeAt(index);
  }

  ngOnDestroy() {
    this.totalControlSubscription.unsubscribe();
    this.createInvoiceSubscription.unsubscribe();
  }
}
