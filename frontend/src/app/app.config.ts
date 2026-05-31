import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    //the file was manually updated already. The issue is that RouterModule.forRoot() is the older NgModule approach — for a standalone app like this one, provideRouter is correct. Let me fix it.
  ]
};
