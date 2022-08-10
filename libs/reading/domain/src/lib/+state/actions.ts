import { createAction, props } from '@ngrx/store';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import { FilterArticlesFormState } from './reducers';

export const loadArticles = createAction(
  '[Article] Load articles'
);

export const articlesLoaded = createAction(
  '[Article] Articles loaded',
  props<{ articles: Partial<Article>[] }>()
);

export const loadArticlesFailure = createAction(
  '[Article] Load articles failure'
);

export const filterArticlesFormStateChange = createAction(
  '[Article] Filter articles form state changed',
  props<{ filterArticlesFormState: FilterArticlesFormState }>()
);

export const loadArticle = createAction(
  '[Article] Load article',
  props<{ articleId: string }>()
);

export const articleLoaded = createAction(
  '[Article] Article loaded',
  props<{ article: Partial<Article> }>()
);

export const loadArticleFailure = createAction(
  '[Article] Load article failure'
);

export const articleCommentsLoaded = createAction(
  '[Article] Article comments loaded',
  props<{ comments: Comment[] }>()
);

export const loadArticleCommentsFailure = createAction(
  '[Article] Load article comments failure'
);