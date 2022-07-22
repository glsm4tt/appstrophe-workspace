import { Routes } from '@angular/router';


export const BLOG_ROUTES: Routes = [
  {
    path: '',
     loadChildren: () =>
    import('@appstrophe-workspace/reading/feature-article').then(m => m.ARTICLE_READING_ROUTES)
  },

];
