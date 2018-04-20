import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { CustomersComponent } from './customers.component';

const customersRoutes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomersRoutingModule { }
