import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewInvoiceComponent } from './view-invoice.component';


const viewInvoiceRoutes: Routes = [
  { path: '', component: ViewInvoiceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(viewInvoiceRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class ViewInvoiceRoutingModule {}
