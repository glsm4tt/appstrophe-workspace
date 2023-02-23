import { createReducer } from "@ngrx/store"

export interface AuthFeatureState {
    appName: string
}

export const initState: AuthFeatureState = {
    appName: 'AuthFeature'
}

export const reducer = createReducer(
    initState
);