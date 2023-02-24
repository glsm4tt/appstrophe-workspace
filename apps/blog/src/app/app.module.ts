import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, initializeFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { provideAuth, browserPopupRedirectResolver, browserSessionPersistence, connectAuthEmulator, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';

const isDev = !environment.production;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedLibModule,
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
    provideStorage(() => {
      const storage = getStorage()

      if (isDev) connectStorageEmulator(storage, 'localhost', 9199);

      return storage;
    }),
    RouterModule.forRoot([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog-routes').then(m => m.BLOG_ROUTES)
      },
      {
        path: '',
        redirectTo: 'blog',
        pathMatch: 'full'
      }
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
