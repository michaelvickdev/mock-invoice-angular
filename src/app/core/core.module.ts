import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { APP_SERVICE_PROVIDERS } from './services/';
import { APP_RESOLVERS_PROVIDERS } from './resolvers';
import { UrlInterceptor } from './interceptor/url-interceptor.service';

import { HeaderModule } from './header/header.module';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    APP_RESOLVERS_PROVIDERS,
    APP_SERVICE_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
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
