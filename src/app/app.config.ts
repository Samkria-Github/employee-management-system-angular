import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from "primeng/config";
import Aura from "@primeng/themes/aura";
import { ConfirmationService } from 'primeng/api';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { responseInterceptor } from './core/interceptor/get-interceptor.service';
import { setInterceptor } from './core/interceptor/set-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([setInterceptor, responseInterceptor])  // Add functional interceptors here
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          mode: 'light',
          darkModeSelector: 'none'
        }
      }
    }),   
    ConfirmationService
  ]
};

