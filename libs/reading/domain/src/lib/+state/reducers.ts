import { Article } from '@appstrophe-workspace/reading/domain';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as ArticleActions from './actions';

export const ARTICLE_FEATURE_KEY = 'article';

export interface ArticlState {
    articles: Partial<Article>[];
    isLoading: boolean;
}

export interface ArticleRootState {
    article: ArticlState;
  }
  
  export const initialState: ArticlState = {
    articles: [],
    isLoading: false
  };

  const reducer = createReducer(
    initialState,

    on(ArticleActions.loadArticles, state => ({ ...state, isLoading: true })),
    on(ArticleActions.articlesLoaded, (state, {articles}) => ({ ...state, articles, isLoading: false })),
    on(ArticleActions.loadArticlesFailure, state => ({ ...state, isLoading: false })),
  );
  
  export const readingFeature = createFeature({
    name: ARTICLE_FEATURE_KEY,
    reducer
});
  