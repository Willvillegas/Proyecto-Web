import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ]
};

/**
 * Implementations when start using the interceptors
 * import { jwtInterceptor } from './movies/interceptors/jwt.interceptor';
 * import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
 * 
 * export const appConfig: ApplicationConfig = {
  *   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  *  provideRouter(routes),
  * provideAnimationsAsync(),
  * provideHttpClient(withFetch(), withInterceptors(jwtInterceptor))
  * ]
  * };
 */