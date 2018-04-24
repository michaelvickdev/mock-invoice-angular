import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateInvoiceComponent } from './create-invoice.component';


const createInvoiceRoutes: Routes = [
  { path: '', component: CreateInvoiceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(createInvoiceRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class CreateInvoiceRoutingModule {}
