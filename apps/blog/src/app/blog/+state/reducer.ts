import { createReducer } from "@ngrx/store"

export interface BlogFeatureState {
    appName: string
}

export const initState: BlogFeatureState = {
    appName: 'BlogFeature'
}

export const reducer = createReducer(
    initState
);