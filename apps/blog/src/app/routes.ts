import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog-routes').then(m => m.BLOG_ROUTES)
    },
    {
        path: '',
        redirectTo: 'blog',
        pathMatch: 'full'
    }
]