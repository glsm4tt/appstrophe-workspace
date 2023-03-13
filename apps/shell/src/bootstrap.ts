import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, initializeFirestore } from '@angular/fire/firestore';
import { provideAuth, browserPopupRedirectResolver, browserSessionPersistence, connectAuthEmulator, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './app/+state/reducer';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { routes } from './app/routes';
import { provideFunctions, getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';

const isDev = !environment.production;

if (!isDev) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
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
      }),
      provideFunctions(() => {
        const functions = getFunctions()

        if(isDev) connectFunctionsEmulator(functions, 'localhost', 5001);

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
  ]
});
