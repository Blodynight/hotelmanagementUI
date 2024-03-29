import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HTTPInterceptor } from './interceptor/http.interceptor';
import { TableFilterPipe } from './shared/pipes/table-filter.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true
    },
    TableFilterPipe
  ]
};
