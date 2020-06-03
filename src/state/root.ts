import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'
import { authReducer, loginEpic, logoutEpic } from './ducks/auth'
import { counterReducer, countEpic } from './ducks/ducks'
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
  countEpic,
  loginEpic,
  logoutEpic,
)

export const reducer = persistReducer(persistConfig, combineReducers({
  authReducer: persistReducer(authReducerConfig, authReducer),
  counterReducer,
}))

export type RootState = ReturnType<typeof reducer>
