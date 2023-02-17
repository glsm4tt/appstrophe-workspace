import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ArticleDetailed } from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { ArticleCommentsComponent } from '../../features/article-comments/article-comments.component';
import { ArticleBodyComponent } from '../../ui/article/body/body.component';
import { ArticleFooterComponent } from '../../ui/article/footer/footer.component';
import { ArticleHeaderComponent } from '../../ui/article/header/header.component';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'apps-read-article-details',
  template: `
    <div class="article_page">
      <ng-container *ngIf="isLoading$ | async; else article_content">
          
      </ng-container>
      <ng-template #article_content>
          <ng-container *ngIf="article$ | async as article">
            <apps-read-article-header></apps-read-article-header>
            <div class="article_page__body">
                <apps-read-article-body [articleUrl]="article.articleUrl"></apps-read-article-body>
            </div>
            <apps-read-article-footer [article]="article"></apps-read-article-footer>
            <apps-read-article-comments></apps-read-article-comments>
          </ng-container>
      </ng-template>
    </div>
  `,
  styles: [`
    div.article_page {
      @apply p-4 pt-12 md:pt-16 md:px-16
    }

    div.article_page .article_page__body {
      @apply mt-8
    }
  `],
  standalone: true,
  imports: [NgIf, AsyncPipe, ArticleHeaderComponent, ArticleBodyComponent, ArticleFooterComponent, ArticleCommentsComponent]
})
export class ArticleDetailsComponent implements OnInit {
  article$: Observable<Partial<ArticleDetailed>> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>);

  ngOnInit() {
    this.article$ = this._store.select(fromArticle.selectArticle);

    this.isLoading$ = this._store.select(fromArticle.selectIsArticleLoading);
  }
}
