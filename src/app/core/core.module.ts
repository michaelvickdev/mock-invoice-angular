import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APP_SERVICE_PROVIDERS } from './services/';
import { APP_HTTP_INTERCEPTORS } from './interceptors';
import { HeaderModule } from './header/header.module';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    APP_SERVICE_PROVIDERS,
    APP_HTTP_INTERCEPTORS
  ],
  exports: [
    HeaderModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
