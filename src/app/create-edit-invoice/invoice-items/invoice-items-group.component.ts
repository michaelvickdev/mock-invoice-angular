import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { filter, map, switchMap } from 'rxjs/operators';

import { Product } from '../../core/interfaces/product';

import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-invoice-items-group',
  templateUrl: './invoice-items-group.component.html',
  styleUrls: ['./invoice-items-group.component.scss']
})
export class InvoiceItemsGroupComponent implements OnInit, OnDestroy {
  
  @Input('itemsGroup') itemsGroup: FormGroup;
  @Input('groupIndex') groupIndex: number;
  @Input('arrayLength') arrayLength: number;
  @Output() deleteItemsGroup = new EventEmitter();
  
  productsList$: Observable<Product[]>;
  productControlSubscription: Subscription;

  constructor(
    private productsService: ProductsService
  ) {
  }

  get createInvoiceProductControl() {
    return this.itemsGroup.get('product_id') as FormControl;
  }
  get createInvoicePriceControl() {
    return this.itemsGroup.get('price') as FormControl;
  }

  ngOnInit() {
    this.productsList$ = this.productsService.productsList$;

    this.productControlSubscription = this.createInvoiceProductControl.valueChanges.pipe(
      filter(res => !!res),
      switchMap( productName => this.productsList$.pipe(
        map(products => _.find(products, {'_id': productName}).price),
      ))
    ).subscribe(price => this.createInvoicePriceControl.patchValue(price));
  }

  ngOnDestroy() {
    this.productControlSubscription.unsubscribe();
  }
  
  deleteGroup() {
    this.deleteItemsGroup.emit();
  }
}
