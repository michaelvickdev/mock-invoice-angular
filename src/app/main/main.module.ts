import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
      MainRoutingModule,
  ],
  declarations: [ MainComponent ]
})
export class MainModule { }
