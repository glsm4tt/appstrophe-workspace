import { Routes } from '@angular/router';
import { fromAuthDomain } from '@appstrophe-workspace/auth/domain';

export const REGISTER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./register/register.component')).RegisterComponent,
    providers: [
      fromAuthDomain()
    ]
  }
];
