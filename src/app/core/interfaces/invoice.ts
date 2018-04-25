import { InvoiceItem } from './invoice-item';
import { Customer } from './customer';

export interface Invoice {
  id: number;
  customer_id: number;
  customer?: Customer;
  discount: number;
  total: number;
  items: InvoiceItem[];
}
