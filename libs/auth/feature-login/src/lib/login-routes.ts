import { Routes } from '@angular/router';
import { fromAuthDomain } from '@appstrophe-workspace/auth/domain';
import { AuthLoginComponent } from './login.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: AuthLoginComponent,
    providers: [
      fromAuthDomain()
    ],
    children: [
      {
        path: 'login',
        loadComponent: async () => (await import('./login/login.component')).LoginComponent,
      },
      {
        path: 'password-retrieve',
        loadComponent: async () => (await import('./password-retrieve/password-retrieve.component')).PasswordRetrieveComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
];
