import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {API_TOKEN, URL_TOKEN} from './auth/tokens/url.token';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), NG_EVENT_PLUGINS,
    provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('access_token');
          }
        },
      }),
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: URL_TOKEN,
      useValue: 'http://gifts-shop.work.gd/api'
    },
    {
      provide: API_TOKEN,
      useValue: 'http://terrestrial-dev.duckdns.org:8080/'
    }
  ]
};
