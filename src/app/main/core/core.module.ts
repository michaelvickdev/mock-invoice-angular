import {NgModule, Optional, SkipSelf} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_SERVICE_PROVIDERS } from './services/index';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    APP_SERVICE_PROVIDERS
  ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
