import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ArticleActions from './actions';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article';



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
}