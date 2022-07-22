import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromArticleState from "./reducers";

// Create feature selector
export const selectArticle = createFeatureSelector<fromArticleState.ArticlState>(
    fromArticleState.ARTICLE_FEATURE_KEY
);

// Use feature selector to get data from feature branch
export const selectArticles = createSelector(selectArticle, s => s.articles);

export const selectIsLoading = createSelector(selectArticle, s => s.isLoading);
