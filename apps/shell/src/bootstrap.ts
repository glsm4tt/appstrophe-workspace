import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      AppRoutingModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideAuth(() => getAuth())
    )
  ]
});
