import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { IndexSectionModule } from './index-section/index-section.module';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    SharedModule,
    IndexSectionModule,
    HomeRoutingModule,
  ]
})

export class HomeModule {}
