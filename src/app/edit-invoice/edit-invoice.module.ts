import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EditInvoiceComponent } from './edit-invoice.component';
import { EditInvoiceRoutingModule } from './edit-invoice-routing.module';


@NgModule({
  declarations: [ EditInvoiceComponent ],
  imports: [
    SharedModule,
    EditInvoiceRoutingModule
  ]
})

export class EditInvoiceModule {}
