import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CreateEditInvoiceComponent } from './create-edit-invoice.component';
import { CreateEditInvoiceRoutingModule } from './create-edit-invoice-routing.module';


@NgModule({
  declarations: [ CreateEditInvoiceComponent ],
  imports: [
    SharedModule,
    CreateEditInvoiceRoutingModule
  ]
})

export class CreateEditInvoiceModule {}
