import { InvoicesService } from './invoices.service';
import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';


export const APP_SERVICE_PROVIDERS = [
  InvoicesService,
  CustomersService,
  ProductsService,
];
