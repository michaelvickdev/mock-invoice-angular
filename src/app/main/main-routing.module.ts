import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
      { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
      { path: 'products', loadChildren: './products/products.module#ProductsModule' },
      { path: '', redirectTo: '/invoices', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(MainRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class MainRoutingModule {}

