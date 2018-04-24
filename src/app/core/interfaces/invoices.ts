import { InvoiceItems } from './invoice-items';
import { Customers } from './customers';

export interface Invoices {
  id: number;
  customer_id: number;
  customer_name?: Customers;
  discount: number;
  total: number;
  items: InvoiceItems[];
}
