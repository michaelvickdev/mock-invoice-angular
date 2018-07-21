import { Product } from './product';

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  product_id: number;
  product?: Product;
  quantity: number;
}
