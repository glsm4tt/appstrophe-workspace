import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () =>
    (await loadRemoteModule({
        type: 'module',
        remoteEntry: environment.host.auth,
        exposedModule: './routes'
      })).AUTH_ROUTES
  },
  {
    path: 'blog',
    loadChildren: async () =>
      (await loadRemoteModule({
        type: 'module',
        remoteEntry: environment.host.blog,
        exposedModule: './routes'
      })).BLOG_ROUTES,
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  }
];
