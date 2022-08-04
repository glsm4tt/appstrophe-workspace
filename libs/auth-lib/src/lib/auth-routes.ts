import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'password-retrieve',
        loadComponent: () => import('./password-retrieve/password-retrieve.component').then(m => m.PasswordRetrieveComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
  }
];
