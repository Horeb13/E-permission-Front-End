import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './app/Services/Auth/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './app/Services/Auth/auth.guard';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


//import 'bootstrap';


export function tokenGetter() {
  return localStorage.getItem('token');
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: BrowserAnimationsModule, useValue: BrowserAnimationsModule },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: []
      }
    })),
    AuthGuard
  ]
});
