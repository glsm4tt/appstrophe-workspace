import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { reducer } from './+state/reducer';


export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@appstrophe-workspace/reading/feature-article').then(m => m.ARTICLE_READING_ROUTES),
    providers: [
      importProvidersFrom(
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
          autoPause: true,
        }) : [],
        StoreRouterConnectingModule.forRoot()
      )
    ]
  },

];
