import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuthState from "./reducers";

// Create feature selector
export const _selectAuth = createFeatureSelector<fromAuthState.AuthState>(
    fromAuthState.AUTH_FEATURE_KEY
);