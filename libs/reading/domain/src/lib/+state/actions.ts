import { Article } from '@appstrophe-workspace/reading/domain';
import { createAction, props } from '@ngrx/store';

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