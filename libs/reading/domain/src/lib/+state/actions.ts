import { createAction, props } from '@ngrx/store';
import { Article } from '../entities/article';
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