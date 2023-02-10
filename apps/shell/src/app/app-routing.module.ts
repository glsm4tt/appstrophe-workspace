import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.host.auth,
        exposedModule: './routes'
      }).then(m => m.AUTH_ROUTES),
  },
  {
    path: 'blog',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.host.blog,
        exposedModule: './routes'
      }).then(m => m.BLOG_ROUTES),
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
