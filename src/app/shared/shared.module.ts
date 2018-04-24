import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTabsModule,
  MatTableModule,
} from '@angular/material';

import { APP_DIRECTIVES } from './directives/index';

@NgModule({
  declarations: [
    APP_DIRECTIVES,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    RouterModule,
    APP_DIRECTIVES,
  ]
})
export class SharedModule {
}
