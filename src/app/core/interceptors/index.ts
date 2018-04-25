import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url-interceptor.service';


export const APP_HTTP_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
];
