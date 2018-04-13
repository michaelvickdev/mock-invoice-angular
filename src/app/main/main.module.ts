import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { HeaderModule } from './components/header/header.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
      HeaderModule,
      MainRoutingModule,
  ],
  declarations: [ MainComponent ]
})
export class MainModule { }
