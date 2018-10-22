import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CreateEditInvoiceComponent } from './create-edit-invoice.component';
import { CreateEditInvoiceRoutingModule } from './create-edit-invoice-routing.module';
import { InvoiceItemsGroupModule } from './invoice-items/invoice-items-group.module';


@NgModule({
  declarations: [ CreateEditInvoiceComponent ],
  imports: [
    SharedModule,
    InvoiceItemsGroupModule,
    CreateEditInvoiceRoutingModule
  ]
})

export class CreateEditInvoiceModule {}
