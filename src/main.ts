import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';  // Import the standalone AppComponent
import { routes } from './app/app.routes';  // Import the routing configuration

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),  // Import the router with your routes
    { provide: LocationStrategy, useClass: HashLocationStrategy },  // Use HashLocationStrategy
    ...appConfig.providers,  // Include any other configurations or providers from your appConfig
  ],
})
  .catch((err) => console.error(err));
