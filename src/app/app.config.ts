import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routesAll } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routesAll), 
    provideHttpClient(
      withFetch(),  // Usa Fetch API ao invés de XMLHttpRequest (recomendado)
      withInterceptorsFromDi()  // Se você tiver interceptors
    ),
    provideClientHydration(withEventReplay())
  ]
};
