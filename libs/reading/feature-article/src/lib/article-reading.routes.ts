import { Route } from "@angular/router";
import { ArticleReadingComponent } from "./article-reading.component";
import { fromReadingDomain } from "@appstrophe-workspace/reading/domain";
import { importProvidersFrom } from "@angular/core";
import { MarkdownModule } from "ngx-markdown";
import { HttpClient, HttpClientModule } from "@angular/common/http";

export const ARTICLE_READING_ROUTES: Route[] = [
    {
        path: '',
        component: ArticleReadingComponent,
        providers: [
            fromReadingDomain()
        ],
        children: [
            {
                path: 'articles',
                loadComponent: () => import('./pages/article-catalog/article-catalog.component').then(m => m.ArticleCatalogComponent)
            },
            {
                path: 'article/:articleId',
                loadComponent: () => import('./pages/article-details/article-details.component').then(m => m.ArticleDetailsComponent),
                providers: [
                    importProvidersFrom(MarkdownModule.forRoot( { loader: HttpClient })),
                    importProvidersFrom(HttpClientModule),
                    importProvidersFrom(HttpClientModule)
                ]
            },
            {
                path: 'article',
                pathMatch: 'full',
                redirectTo: 'articles'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'articles'
            }
        ]
    }
]