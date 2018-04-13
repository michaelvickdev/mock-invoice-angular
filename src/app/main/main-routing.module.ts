import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
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

