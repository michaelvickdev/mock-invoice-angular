import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { APP_DIRECTIVES } from './directives/index';


@NgModule({
  declarations: [
    APP_DIRECTIVES,git
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
    APP_DIRECTIVES,
  ]
})
export class SharedModule {
}
