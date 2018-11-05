import { InvoicesService } from './invoices.service';
import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';
import { ModalBoxService } from './modal-box.service';
import { ViewCreateEditService } from './view-create-edit.service';


export const APP_SERVICE_PROVIDERS = [
  InvoicesService,
  CustomersService,
  ProductsService,
  ModalBoxService,
  ViewCreateEditService
];
