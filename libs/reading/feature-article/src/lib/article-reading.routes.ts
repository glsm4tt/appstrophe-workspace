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
                loadComponent: () => import('./pages/article-list/article-list.component').then(m => m.ArticleListComponent)
            },
            {
                path: 'article/:articleId',
                loadComponent: () => import('./pages/article-details/article-details.component').then(m => m.ArticleDetailsComponent),
                providers: [
                    importProvidersFrom(MarkdownModule.forRoot( { loader: HttpClient })),
                    importProvidersFrom(HttpClientModule)
                ]
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'articles'
            }
        ]
    }
]