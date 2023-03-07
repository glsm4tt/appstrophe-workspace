import { Routes } from '@angular/router';
import { fromAuthDomain } from '@appstrophe-workspace/auth/domain';

export const USER_SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./user-settings/user-settings.component')).UserSettingsComponent,
    providers: [
      fromAuthDomain()
    ]
  }
];
