import { ProductModel } from './product-model';

export class InvoiceItemModel {
  _id: string = null;
  invoice_id: string = null;
  product_id: string = null;
  product?: ProductModel = new ProductModel();
  quantity: number = null;
  
  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
