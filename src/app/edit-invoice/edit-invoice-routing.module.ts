import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditInvoiceComponent } from './edit-invoice.component';


const viewInvoiceRoutes: Routes = [
  { path: '', component: EditInvoiceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(viewInvoiceRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class EditInvoiceRoutingModule {}
