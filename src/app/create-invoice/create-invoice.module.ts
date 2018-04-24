import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CreateInvoiceComponent } from './create-invoice.component';
import { CreateInvoiceRoutingModule } from './create-invoice-routing.module';


@NgModule({
  declarations: [ CreateInvoiceComponent ],
  imports: [
    SharedModule,
    CreateInvoiceRoutingModule
  ]
})

export class CreateInvoiceModule {}
