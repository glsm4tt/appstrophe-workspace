import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, browserPopupRedirectResolver, browserSessionPersistence, connectAuthEmulator, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { provideFirestore, initializeFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore';

const isDev = !environment.production;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
