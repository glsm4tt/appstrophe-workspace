import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('@appstrophe-workspace/auth-lib').then(m => m.AUTH_ROUTES),
  }
];
