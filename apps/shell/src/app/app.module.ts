import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


@NgModule({
//  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ShellFrameLibModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
 // bootstrap: [AppComponent],
})
export class AppModule { }