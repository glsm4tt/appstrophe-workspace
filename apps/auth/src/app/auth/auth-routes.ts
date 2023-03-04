import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-login').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'register',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-register').then(m => m.REGISTER_ROUTES)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('@appstrophe-workspace/auth/feature-user-settings').then(m => m.USER_SETTINGS_ROUTES)
  }
];
