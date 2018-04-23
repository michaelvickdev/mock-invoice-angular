import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';


@NgModule({
  declarations: [ InvoicesComponent ],
  imports: [
    SharedModule,
    InvoicesRoutingModule,
  ]
})

export class InvoicesModule {}
