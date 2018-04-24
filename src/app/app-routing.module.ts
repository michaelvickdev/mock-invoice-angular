import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', redirectTo: '/invoices', pathMatch: 'full' },
      { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
      { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
      { path: 'products', loadChildren: './products/products.module#ProductsModule' },
      { path: 'create-invoice', loadChildren: './create-invoice/create-invoice.module#CreateInvoiceModule' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        initialNavigation: 'enabled'
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}