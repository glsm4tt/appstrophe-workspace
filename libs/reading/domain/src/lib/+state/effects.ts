import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ArticleActions from './actions';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';



@Injectable()
export class ArticleEffects {

  constructor(private articleService: ArticleService, private actions$: Actions) { }

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticles),
      switchMap(_ => this.articleService.getAll()),
      map((articles: Partial<Article>[]) => ArticleActions.articlesLoaded({ articles })),
      catchError(_ => of(ArticleActions.loadArticlesFailure()))
    )
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      switchMap(action => this.articleService.getOne(action.articleId)),
      map((article: Partial<Article>) => ArticleActions.articleLoaded({ article })),
      catchError(_ => of(ArticleActions.loadArticleFailure()))
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      switchMap(action => this.articleService.getComments(action.articleId)),
      map((comments: Comment[]) => ArticleActions.articleCommentsLoaded({ comments })),
      catchError(_ => of(ArticleActions.loadArticleCommentsFailure()))
    )
  );
}