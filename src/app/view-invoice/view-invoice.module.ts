import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ViewInvoiceComponent } from './view-invoice.component';
import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';


@NgModule({
  declarations: [ ViewInvoiceComponent ],
  imports: [
    SharedModule,
    ViewInvoiceRoutingModule
  ]
})

export class ViewInvoiceModule {}
