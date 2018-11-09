import { InvoiceItem } from './invoice-item';
import { Customer } from './customer';

export interface Invoice {
  _id: string;
  customer_id: string;
  customer?: Customer;
  discount: number;
  total: number;
  items: InvoiceItem[];
}
