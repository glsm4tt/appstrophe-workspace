import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Article, ArticleDetailed, ArticleService } from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, firstValueFrom } from 'rxjs';
import { ArticleCommentsComponent } from '../../features/article-comments/article-comments.component';
import { ArticleBodyComponent } from '../../ui/article/body/body.component';
import { ArticleFooterComponent } from '../../ui/article/footer/footer.component';
import { ArticleHeaderComponent } from '../../ui/article/header/header.component';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Router } from '@angular/router';
import { AuthService } from '@appstrophe-workspace/auth/domain';

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
            <apps-read-article-footer [article]="article" (likeChange)="updateLikeStatus(article)"></apps-read-article-footer>
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
  private _articleService = inject(ArticleService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  ngOnInit() {
    this.article$ = this._store.select(fromArticle.selectArticle);
    this.isLoading$ = this._store.select(fromArticle.selectIsArticleLoading);
  }

  async updateLikeStatus(article: Partial<ArticleDetailed>): Promise<void> {
    const currentUser = await firstValueFrom(this._authService.getConnectedUser());
    if(!currentUser)
      this._router.navigateByUrl(`/auth/login?previous=${this._router.url}`);
    else {
      if(article.liked)
        await this._articleService.unlike(article.id, currentUser)
      else
        await this._articleService.like(article.id, currentUser)
    }
  }
}
