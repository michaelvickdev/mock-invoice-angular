import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesResolver } from './core/resolvers/invoices-resolver';
import { CustomersResolver } from './core/resolvers/customers-resolver';
import { ProductsResolver } from './core/resolvers/products-resolver';
import { ViewInvoiceResolver } from './core/resolvers/view-invoice-resolver';


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
        resolve: [ CustomersResolver, ProductsResolver ]

      },
      { path: 'view-invoice/:id',
        loadChildren: './view-invoice/view-invoice.module#ViewInvoiceModule',
        resolve: [ InvoicesResolver, CustomersResolver, ProductsResolver, ViewInvoiceResolver]
      },
      { path: 'edit-invoice',
        loadChildren: './edit-invoice/edit-invoice.module#EditInvoiceModule',
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
})
export class AppRoutingModule {}
