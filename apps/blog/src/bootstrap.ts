import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver, connectAuthEmulator, browserLocalPersistence } from '@angular/fire/auth';
import { provideFirestore, initializeFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';

import { reducer } from './app/blog/+state/reducer';
import { routes } from './app/routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const isDev = !environment.production;

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: isDev ? true : false,
        });

        if (isDev) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
        }

        // enableIndexedDbPersistence(firestore);

        return firestore;
      }),
      provideAuth(() => {
        const auth = initializeAuth(getApp(), {
          persistence: isDev
            ? browserLocalPersistence
            : indexedDBLocalPersistence,
          popupRedirectResolver: browserPopupRedirectResolver,
        });

        if (isDev) connectAuthEmulator(auth, 'http://localhost:9099');

        return auth;
      }),
      provideStorage(() => {
        const storage = getStorage()

        if (isDev) connectStorageEmulator(storage, 'localhost', 9199);

        return storage;
      }),
      provideFunctions(() => {
        const functions = getFunctions()

        if (isDev) connectFunctionsEmulator(functions, 'localhost', 5001);

        return functions;
      }),
      StoreModule.forRoot(reducer, {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }),
      !environment.production ? StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
        autoPause: true,
      }) : [],
      StoreRouterConnectingModule.forRoot(),
      EffectsModule.forRoot([])
    )
  ],
});


