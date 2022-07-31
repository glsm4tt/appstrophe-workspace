import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js', //'https://appstrophe-auth.web.app/remoteEntry.js',
        exposedModule: './routes'
      }).then(m => m.AUTH_ROUTES),
  },
  {
    path: 'blog',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js', //'https://appstrophe-blog.web.app/remoteEntry.js',
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
