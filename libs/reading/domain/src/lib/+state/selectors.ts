import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromArticleState from "./reducers";

// Create feature selector
export const selectArticle = createFeatureSelector<fromArticleState.ArticlState>(
    fromArticleState.ARTICLE_FEATURE_KEY
);

// Use feature selector to get data from feature branch
export const selectArticles = createSelector(selectArticle, s => s.articles);

export const selectIsLoading = createSelector(selectArticle, s => s.isLoading);

export const selectFilterArticlesFormState = createSelector(selectArticle, s => s.filterArticlesFormState);

export const selectFilteredArticles = createSelector(selectArticles, selectFilterArticlesFormState,
    (articles, filters) => articles
        .filter(a => (!filters.search || a.title?.includes(filters.search))
            && (!filters.tags?.length || filters.tags?.every(tag => a.tags?.findIndex(t => t.id === tag.id) !== -1))
        )
);