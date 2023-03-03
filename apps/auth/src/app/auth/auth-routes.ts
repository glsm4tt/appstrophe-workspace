import { Routes } from '@angular/router';
import { fromAuth } from './auth-providers';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-login').then(m => m.LOGIN_ROUTES),
    providers: [
      fromAuth()
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-register').then(m => m.REGISTER_ROUTES),
    providers: [
      fromAuth()
    ]
  },
  {
    path: 'user-settings',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-user-settings').then(m => m.USER_SETTINGS_ROUTES),
    providers: [
      fromAuth()
    ]
  }
];
