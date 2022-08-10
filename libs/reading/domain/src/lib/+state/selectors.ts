import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromArticleState from "./reducers";

// Create feature selector
export const _selectArticle = createFeatureSelector<fromArticleState.ArticlState>(
    fromArticleState.ARTICLE_FEATURE_KEY
);

// Use feature selector to get data from feature branch
export const selectArticles = createSelector(_selectArticle, s => s.articles);

export const selectAreArticlesLoading = createSelector(_selectArticle, s => s.articlesAreLoading);

export const selectFilterArticlesFormState = createSelector(_selectArticle, s => s.filterArticlesFormState);

export const selectFilteredArticles = createSelector(selectArticles, selectFilterArticlesFormState,
    (articles, filters) => articles
        .filter(a => (!filters.search || a.title?.includes(filters.search))
            && (!filters.tags?.length || filters.tags?.every(tag => a.tags?.findIndex(t => t.id === tag.id) !== -1))
        )
);

export const selectArticle = createSelector(_selectArticle, s => s.article);

export const selectIsArticleLoading = createSelector(_selectArticle, s => s.articleIsLoading);

export const selectComments = createSelector(_selectArticle, s => s.comments);

export const selectAreCommentsLoading = createSelector(_selectArticle, s => s.commentsAreLoading);