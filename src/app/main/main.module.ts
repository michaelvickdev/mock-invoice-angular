import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  imports: [
      HeaderModule,
      MainRoutingModule,
  ],
  declarations: [ MainComponent ]
})
export class MainModule { }
