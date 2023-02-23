import { IdName } from '@appstrophe-workspace/shared-lib';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as fromActions from './actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  aliasesLoading: boolean
}

export interface AuthRootState {
  auth: AuthState;
}

export const initialState: AuthState = {
  aliasesLoading: false
};

const reducer = createReducer(
  initialState,
);

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer
});
