import { NgModule } from '@angular/core';

import { HeaderModule } from './components/header/header.module';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
      HeaderModule,
      MainRoutingModule,
  ],
  declarations: [ MainComponent ]
})
export class MainModule { }
