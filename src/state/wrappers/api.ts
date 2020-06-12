import { Axios } from 'axios-observable';
import { catchError, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Method } from 'axios';

const instance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

interface APIParameters {
  url: string,
  method: Method,
  errorAction: (data: object) => {[Key: string]: string},
  successAction: (data: object) => any,
  data?: FormData,
  headers?: HeadersInit
}

export default function apiClient({
  url, method, errorAction, successAction, data, headers,
}: APIParameters) {
  const authToken = JSON.parse(localStorage.getItem('persist:authReducer') || '');
  return from(instance.request({
    data,
    headers: {
      ...headers,
      Authorization: `Bearer ${authToken}`,
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
