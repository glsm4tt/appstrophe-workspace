import { IdName } from '@appstrophe-workspace/shared-lib';
import { createReducer, on, createFeature } from '@ngrx/store';
import { Article } from '../entities/article';
import * as ArticleActions from './actions';

export const ARTICLE_FEATURE_KEY = 'article';

export interface FilterArticlesFormState {
  search: string;
  tags: IdName[];
}

export interface ArticlState {
    articles: Partial<Article>[];
    isLoading: boolean;
    filterArticlesFormState: FilterArticlesFormState
}

export interface ArticleRootState {
    article: ArticlState;
  }
  
  export const initialState: ArticlState = {
    articles: [],
    isLoading: false,
    filterArticlesFormState: {
      search: '',
      tags: []
    }
  };

  const reducer = createReducer(
    initialState,

    on(ArticleActions.loadArticles, state => ({ ...state, isLoading: true })),
    on(ArticleActions.articlesLoaded, (state, {articles}) => ({ ...state, articles, isLoading: false })),
    on(ArticleActions.loadArticlesFailure, state => ({ ...state, isLoading: false })),
    on(ArticleActions.filterArticlesFormStateChange, (state, {filterArticlesFormState}) => ({ ...state, filterArticlesFormState })),
  );
  
  export const readingFeature = createFeature({
    name: ARTICLE_FEATURE_KEY,
    reducer
});
  