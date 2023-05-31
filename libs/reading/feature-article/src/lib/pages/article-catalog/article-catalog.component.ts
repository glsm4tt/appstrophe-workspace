import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, map } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Article } from '@appstrophe-workspace/reading/domain';
import { ArticleSearchComponent } from '../../features/article-search/article-search.component';
import { ArticleListComponent } from '../../features/article-list/article-list.component';
import { LoaderComponent } from '@appstrophe-workspace/shared-lib';

@Component({
  selector: 'apps-read-article-catalog',
  standalone: true,
  imports: [NgIf, AsyncPipe, ArticleSearchComponent, ArticleListComponent, LoaderComponent],
  template: `
    <apps-read-article-search></apps-read-article-search>
    <apps-loader *ngIf="isLoading$ | async"/>
    <apps-read-article-list [articles]="articles$ | async"></apps-read-article-list>
  `,
  styles: [`
    apps-loader {
      @apply absolute top-32 left-1/2 -translate-x-1/2 mr-auto z-50;
    }
  `]
})
export class ArticleCatalogComponent implements OnInit {
  articles$: Observable<Partial<Article>[]> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>) ;

  ngOnInit(): void {
    this.articles$ = this._store.select(fromArticle.selectFilteredArticles);

    this.isLoading$ = this._store.select(fromArticle.selectAreArticlesLoading);
  }
}
