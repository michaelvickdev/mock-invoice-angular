import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEditInvoiceComponent } from './create-edit-invoice.component';


const createInvoiceRoutes: Routes = [
  { path: '', component: CreateEditInvoiceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(createInvoiceRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class CreateEditInvoiceRoutingModule {}
