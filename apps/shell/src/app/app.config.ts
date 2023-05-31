import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routes';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import {
  provideAuth,
  browserPopupRedirectResolver,
  connectAuthEmulator,
  indexedDBLocalPersistence,
  initializeAuth,
  browserLocalPersistence,
} from '@angular/fire/auth';
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

const isDev = !environment.production;

if (!isDev) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: isDev ? true : false,
        });

        if (isDev) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
        }

        return firestore;
      }),
      provideStorage(() => {
        const storage = getStorage();

        if (isDev) connectStorageEmulator(storage, 'localhost', 9199);

        return storage;
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
      provideFunctions(() => {
        const functions = getFunctions();

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
      !environment.production
        ? StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true,
          })
        : [],
      StoreRouterConnectingModule.forRoot(),
      EffectsModule.forRoot([])
    ),
  ],
};
