import { InvoicesResolver } from './invoices-resolver';
import { CustomersResolver } from './customers-resolver';
import { ProductsResolver } from './products-resolver';

export const APP_RESOLVERS_PROVIDERS = [
  InvoicesResolver,
  CustomersResolver,
  ProductsResolver,
];
