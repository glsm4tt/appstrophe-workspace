import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Article } from '@appstrophe-workspace/reading/domain';
import { ArticleSearchComponent } from '../../features/article-search/article-search.component';
import { ArticleListComponent } from '../../features/article-list/article-list.component';

@Component({
  selector: 'article-catalog',
  template: `
    <article-search></article-search>
    <ng-container *ngIf="isLoading$ | async; else articles">
            
    </ng-container>
    <ng-template #articles>
      <article-list [articles]="articles$ | async"></article-list>
    </ng-template>
  `,
  standalone: true,
  imports: [NgIf, AsyncPipe, ArticleSearchComponent, ArticleListComponent]
})
export class ArticleCatalogComponent implements OnInit {
  articles$: Observable<Partial<Article>[]> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>) 

  ngOnInit(): void {
    this.articles$ = this._store.select(fromArticle.selectFilteredArticles);

    this.isLoading$ = this._store.select(fromArticle.selectAreArticlesLoading);

    this._store.dispatch(fromArticle.loadArticles())
  }
}
