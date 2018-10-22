import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemsGroupComponent } from './invoice-items-group.component';


@NgModule({
  declarations: [ InvoiceItemsGroupComponent ],
  imports: [
    SharedModule,
  ],
  exports: [ InvoiceItemsGroupComponent ],
})

export class InvoiceItemsGroupModule {}
