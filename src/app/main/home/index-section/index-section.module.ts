import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IndexSectionComponent } from './index-section.component';

@NgModule({
  declarations: [
    IndexSectionComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [ IndexSectionComponent ]
})

export class IndexSectionModule {}
