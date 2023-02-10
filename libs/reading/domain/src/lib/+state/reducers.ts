import { IdName } from '@appstrophe-workspace/shared-lib';
import { createReducer, on, createFeature } from '@ngrx/store';
import { ArticleDetailed } from '../entities';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import * as ArticleActions from './actions';

export const ARTICLE_FEATURE_KEY = 'article';

export interface FilterArticlesFormState {
  search: string;
  tags: string[];
}

export interface ArticlState {
    articles: Partial<Article>[];
    articlesAreLoading: boolean;
    filterArticlesFormState: FilterArticlesFormState;
    article: Partial<ArticleDetailed>;
    articleIsLoading: boolean;
    comments: Comment[];
    commentsAreLoading: boolean;
}

export interface ArticleRootState {
    article: ArticlState;
  }
  
  export const initialState: ArticlState = {
    articles: [],
    articlesAreLoading: false,
    filterArticlesFormState: {
      search: '',
      tags: []
    },
    article: null,
    articleIsLoading: false,
    comments: [],
    commentsAreLoading: false
  };

  const reducer = createReducer(
    initialState,

    on(ArticleActions.loadArticles, state => ({ ...state, articlesAreLoading: true })),
    on(ArticleActions.articlesLoaded, (state, {articles}) => ({ ...state, articles, articlesAreLoading: false })),
    on(ArticleActions.loadArticlesFailure, state => ({ ...state, articlesAreLoading: false })),
    on(ArticleActions.filterArticlesFormStateChange, (state, {filterArticlesFormState}) => ({ ...state, filterArticlesFormState })),

    on(ArticleActions.loadArticle, state => ({ ...state, articleIsLoading: true, commentsAreLoading: true })),
    on(ArticleActions.articleLoaded, (state, {article}) => ({ ...state, article, articleIsLoading: false })),
    on(ArticleActions.loadArticleFailure, state => ({ ...state, articleIsLoading: false })),

    on(ArticleActions.articleCommentsLoaded, (state, {comments}) => ({ ...state, comments, commentsAreLoading: false })),
    on(ArticleActions.loadArticleCommentsFailure, state => ({ ...state, commentsAreLoading: false })),
  );
  
  export const readingFeature = createFeature({
    name: ARTICLE_FEATURE_KEY,
    reducer
});
  