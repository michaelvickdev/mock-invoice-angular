import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ModalBoxComponent } from './core/modal-box/modal-box.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalBoxComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  entryComponents: [
    ModalBoxComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
