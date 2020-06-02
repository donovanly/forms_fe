import {
    AnyAction,
    createSlice,
} from "@reduxjs/toolkit"
import { Epic } from "redux-observable";
import { filter, mergeMap  } from "rxjs/operators";

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

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {} as Auth,
        profile: {} as Profile,
        isLoading: false
    },
    reducers: {
        loginRequest: (state, _) => ({ ...state, isLoading: true }),
        loginSuccess: (state, action) => ({
            ...state,
            auth: action.payload,
            profile: action.payload.profile,
            isLoading: false
        }),
        loginFailure: (state) => ({
            ...state,
            isLoading: false
        })
    }
});

export const { loginRequest } = authSlice.actions
export const authReducer = authSlice.reducer

export const authEpic: Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.loginRequest.match),
    mergeMap( action => {
        const form = new FormData()
        for (const key in action.payload) {
            form.append(key, action.payload[key])
        }
        return fetch(
            process.env.REACT_APP_BASE_URL + "auth/login/", {
                method: 'POST',
                body: form
            }
        ).then( response => {
            if (!response.ok) {
                return Promise.reject(response)
            }
            return response
        }).then( response => 
            response.json()
        ).then( body => 
            authSlice.actions.loginSuccess(body)
        ).catch( err =>
            authSlice.actions.loginFailure()
        )
    })
);
