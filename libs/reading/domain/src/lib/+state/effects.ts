import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, filter, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as ArticleActions from './actions';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import { ArticleDetailed } from '../entities';
import { LocalstorageService } from '@appstrophe-workspace/shared-lib';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { CommentService } from '../services';

const ARTICLES_STORAGE_KEY = '_articles_';
const ARTICLE_STORAGE_KEY = '_article_';

@Injectable()
export class ArticleEffects {

  private _articleService = inject(ArticleService);
  private _commentService = inject(CommentService);
  private _actions$ = inject(Actions);
  private _localStorage = inject(LocalstorageService);

  routerListener$ = createEffect(() => 
    this._actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(r => r.payload.routerState.url.split('/').filter((url: string) => !!url)),
      filter(urls => urls[1] && ['article', 'articles'].includes(urls[1])),
      map(urls => urls[1] === 'articles' 
        ? ArticleActions.loadArticles() 
        : ArticleActions.loadArticle({ articleId: urls.at(-1) })
      ),
    )
  )

  loadArticles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ArticleActions.loadArticles),
      mergeMap(_ => this._articleService.getAll().pipe(
          map((articles: Partial<Article>[]) => ArticleActions.articlesLoaded({ articles })),
          catchError(_ => of(ArticleActions.loadArticlesFailure())),
      ))
    )
  );

  loadArticle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ArticleActions.loadArticle),
      map(action => ({articleId: action.articleId, storedArticle: this._localStorage.get<Partial<ArticleDetailed>>(`${ARTICLE_STORAGE_KEY}${action.articleId}`)})),
      tap(({articleId, storedArticle}) => {
        if(!storedArticle) // If the article doesn't exist in the cache, we add a view
          this._articleService.view(articleId)
      }),
      mergeMap(({articleId}) => (this._articleService.getOne(articleId).pipe(
            tap(article => this._localStorage.set<Partial<ArticleDetailed>>(`${ARTICLE_STORAGE_KEY}${articleId}`, article)),
          )).pipe(
          map((article: Partial<ArticleDetailed>) => ArticleActions.articleLoaded({ article })),
          catchError(_ => of(ArticleActions.loadArticleFailure()))
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ArticleActions.loadArticle),
      switchMap(action => this._commentService.getComments(action.articleId)),
      map((comments: Comment[]) => ArticleActions.articleCommentsLoaded({ comments })),
      catchError(_ => of(ArticleActions.loadArticleCommentsFailure()))
    )
  );
}