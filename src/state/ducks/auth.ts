/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AnyAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import apiClient, { IAuth } from '../wrappers/api';

interface Profile {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string
}

const initialState = {
  auth: {} as IAuth,
  profile: {} as Profile,
  isLoading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => ({ ...state, isLoading: true }),
    loginSuccess: (state, action) => ({
      ...state,
      auth: { ...action.payload, profile: undefined },
      profile: action.payload.profile,
      isLoading: false,
      isAuthenticated: true,
    }),
    loginFailure: (state, action) => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
    }),
    logoutRequest: (state, action) => ({ ...state, isLoading: true }),
    logoutSuccess: (state, action) => initialState,
    registerRequest: (state, action) => ({ ...state, isLoading: true }),
    registerSuccess: (state, action) => ({
      ...state,
      auth: { ...action.payload, profile: undefined },
      profile: action.payload.profile,
      isLoading: false,
      isAuthenticated: true,
    }),
    registerFailure: (state, action) => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
    }),
  },
});

export const { loginRequest, logoutRequest, registerRequest } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const logoutEpic:
  Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.logoutRequest.match),
    map(authSlice.actions.logoutSuccess),
  );

export const loginEpic:
  Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.loginRequest.match),
    mergeMap((action) => {
      const data = new FormData();
      for (const key in action.payload) {
        data.append(key, action.payload[key]);
      }
      return apiClient({
        data,
        url: 'auth/login/',
        method: 'POST',
        errorAction: authSlice.actions.loginFailure,
        successAction: authSlice.actions.loginSuccess,
      }, store);
    }),
  );

export const registerEpic:
  Epic<AnyAction, AnyAction, ReturnType<typeof authReducer>> = (action$, store) => action$.pipe(
    filter(authSlice.actions.registerRequest.match),
    mergeMap((action) => {
      const data = new FormData();
      for (const key in action.payload) {
        data.append(key, action.payload[key]);
      }
      return apiClient({
        data,
        url: 'auth/register/',
        method: 'POST',
        errorAction: authSlice.actions.registerFailure,
        successAction: authSlice.actions.registerSuccess,
      }, store);
    }),
  );
