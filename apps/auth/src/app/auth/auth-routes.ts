import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { reducer } from './+state/reducer';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-login').then(m => m.LOGIN_ROUTES),
    providers: [
      importProvidersFrom(StoreModule.forRoot(reducer,
        {
          metaReducers: !environment.production ? [] : [],
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
          },
        })),
      importProvidersFrom(EffectsModule.forRoot([])),
      importProvidersFrom(!environment.production ? StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
        autoPause: true,
      }) : []),
      importProvidersFrom(StoreRouterConnectingModule.forRoot())
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-register').then(m => m.REGISTER_ROUTES),
    providers: [
      importProvidersFrom(StoreModule.forRoot(reducer,
        {
          metaReducers: !environment.production ? [] : [],
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
          },
        })),
      importProvidersFrom(EffectsModule.forRoot([])),
      importProvidersFrom(!environment.production ? StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
        autoPause: true,
      }) : []),
      importProvidersFrom(StoreRouterConnectingModule.forRoot())
    ]
  }
];
