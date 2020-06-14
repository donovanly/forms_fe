/* eslint-disable camelcase */
import { Axios } from 'axios-observable';
import { catchError, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Method } from 'axios';
import { StateObservable } from 'redux-observable';

interface APIParameters {
  url: string,
  method: Method,
  errorAction: (data: object) => {[Key: string]: string},
  successAction: (data: object) => any,
  data?: FormData,
  headers?: HeadersInit
}

export interface IAuth {
  access_token: string,
  expires_in: number,
  token_type: string,
  scope: string,
  refresh_token: string
}

const instance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default function apiClient({
  url, method, errorAction, successAction, data, headers,
}: APIParameters, store: StateObservable<any>) {
  return from(instance.request({
    data,
    headers: {
      ...headers,
      Authorization: `Bearer ${store.value.authReducer.auth.access_token}`,
    },
    method,
    url,
  })).pipe(
    map((res) => successAction(res.data)),
    catchError((err) => {
      if (!err.response) return of(errorAction({ error: 'network_unavailable' }));
      return of(errorAction(err.response.data));
    }),
  );
}
