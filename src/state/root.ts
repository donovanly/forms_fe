import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'
import { authReducer, loginEpic, logoutEpic, registerEpic } from './ducks/auth'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer']
}

const authReducerConfig = {
    key: 'authReducer',
    storage,
    blacklist: ['isLoading']
}

export const rootEpic = combineEpics<any>(
  loginEpic,
  logoutEpic,
  registerEpic,
)

export const reducer = persistReducer(persistConfig, combineReducers({
  authReducer: persistReducer(authReducerConfig, authReducer),
}))

export type RootState = ReturnType<typeof reducer>
