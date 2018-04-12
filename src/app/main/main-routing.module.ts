import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent
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
export class MainRoutingModule {
}