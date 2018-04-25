import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesResolver } from './core/resolvers/invoices-resolver';
import { CustomersResolver } from './core/resolvers/customers-resolver';
import { ProductsResolver } from './core/resolvers/products-resolver';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', redirectTo: '/invoices', pathMatch: 'full' },
      { path: 'invoices',
        loadChildren: './invoices/invoices.module#InvoicesModule',
        resolve: [ InvoicesResolver, CustomersResolver ]
      },
      { path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule',
        resolve: [ CustomersResolver ]
        },
      { path: 'products',
        loadChildren: './products/products.module#ProductsModule',
        resolve: [ ProductsResolver ]
      },
      { path: 'create-invoice',
        loadChildren: './create-invoice/create-invoice.module#CreateInvoiceModule',
      },
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
  ],
  providers: [
    InvoicesResolver,
    CustomersResolver,
    ProductsResolver,
  ]
})
export class AppRoutingModule {}
