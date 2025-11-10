import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from '@features/auth.component/services/auth.service';
import { LoginForm } from '@features/auth.component/models/LoginForm';
import { authInterceptor } from '@core/interceptors/auth.interceptor-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(AuthService).init()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
