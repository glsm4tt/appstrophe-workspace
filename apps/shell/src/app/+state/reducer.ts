import { createReducer } from "@ngrx/store"

export interface AppState {
    appName: string
}

export const initState: AppState = {
    appName: 'Shell'
}

export const reducer = createReducer(
    initState
);