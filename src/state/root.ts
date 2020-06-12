import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  authReducer, loginEpic, logoutEpic, registerEpic,
} from './ducks/auth';
import { formReducer, formEpic } from './ducks/form';
import { formListReducer, getFormListEpic } from './ducks/formList';

const authReducerConfig = {
  key: 'authReducer',
  storage,
  blacklist: ['isLoading'],
};

export const rootEpic = combineEpics<any>(
  loginEpic,
  logoutEpic,
  getFormListEpic,
  registerEpic,
  formEpic,
);

export const reducer = combineReducers({
  authReducer: persistReducer(authReducerConfig, authReducer),
  formReducer,
  formListReducer,
});

export type RootState = ReturnType<typeof reducer>
