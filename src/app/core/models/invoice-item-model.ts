import { ProductModel } from './product-model';

export class InvoiceItemModel {
  id: number = null;
  invoice_id: number = null;
  product_id: number = null;
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
