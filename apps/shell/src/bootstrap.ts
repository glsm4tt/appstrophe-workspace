import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

 bootstrapApplication(AppComponent, {
  providers: [
    ...importProvidersFrom(AppRoutingModule),
    ...importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    ...importProvidersFrom(provideFirestore(() => getFirestore())),
    ...importProvidersFrom(provideAuth(() => getAuth()))
  ]});
  
/*
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
  */