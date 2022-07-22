import { Route } from "@angular/router";
import { ArticleReadingComponent } from "./article-reading.component";
import { ArticleSearchComponent } from "./article-search/article-search.component";
import { fromReadingDomain } from "@appstrophe-workspace/reading/domain";

export const ARTICLE_READING_ROUTES: Route[] = [
    {
        path: '',
        component: ArticleReadingComponent,
        providers: [
            fromReadingDomain()
        ],
        children: [
            {
                path: 'article-search',
                component: ArticleSearchComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'article-search'
            }
        ]
    }
]