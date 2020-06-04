import {
    AnyAction,
    createSlice,
} from "@reduxjs/toolkit"
import { Epic } from "redux-observable";
import { filter, map, mergeMap  } from "rxjs/operators";
import { apiClient } from '../wrappers/api'

interface Auth {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope: string,
    refresh_token: string
}

interface Profile {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string
}

const initialState = {
    auth: {} as Auth,
    profile: {} as Profile,
    isLoading: false,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action) => ({ ...state, isLoading: true }),
        loginSuccess: (state, action) => ({
            ...state,
            auth: action.payload.data,
            profile: action.payload.profile,
            isLoading: false,
            isAuthenticated: true
        }),
        loginFailure: (state, action) => ({
            ...state,
            isLoading: false,
            isAuthenticated: false
        }),
        logoutRequest: (state, action) => ({ ...state, isLoading: true }),
        logoutSuccess: (state, action) => initialState
    }
});

export const { loginRequest, logoutRequest } = authSlice.actions
export const authReducer = authSlice.reducer

export const logoutEpic: Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.logoutRequest.match),
    map(authSlice.actions.logoutSuccess)
)

export const loginEpic: Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.loginRequest.match),
    mergeMap( action => {
        const data = new FormData()
        for (const key in action.payload) {
            data.append(key, action.payload[key])
        }
        return apiClient({
            data,
            url: "auth/login/",
            method: "POST",
            errorAction: authSlice.actions.loginFailure,
            successAction: authSlice.actions.loginSuccess,
        })
    })
)
