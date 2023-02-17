import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, initializeFirestore } from '@angular/fire/firestore';
import { provideAuth, browserPopupRedirectResolver, browserSessionPersistence, connectAuthEmulator, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

const isDev = !environment.production;

if (!isDev) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      AppRoutingModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: isDev ? true : false,
        });
  
        if (isDev) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
          enableIndexedDbPersistence(firestore);
        }
  
        return firestore;
      }),
      provideStorage(() => {
        const storage = getStorage()
  
        if (isDev) connectStorageEmulator(storage, 'localhost', 9199);
  
        return storage;
      }),
      provideAuth(() => {
        const auth = initializeAuth(getApp(), {
          persistence: isDev
            ? browserSessionPersistence
            : indexedDBLocalPersistence,
          popupRedirectResolver: browserPopupRedirectResolver,
        });
  
        if (isDev) connectAuthEmulator(auth, 'http://localhost:9099');
  
        return auth;
      })
    )
  ]
});
