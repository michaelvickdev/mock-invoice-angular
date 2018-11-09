import { Product } from './product';

export interface InvoiceItem {
  _id: string;
  invoice_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
}
