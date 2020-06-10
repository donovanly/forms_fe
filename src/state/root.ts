import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'
import { authReducer, loginEpic, logoutEpic, registerEpic } from './ducks/auth'
import { formReducer, saveFormEpic } from './ducks/form'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const authReducerConfig = {
    key: 'authReducer',
    storage,
    blacklist: ['isLoading']
}

export const rootEpic = combineEpics<any>(
  loginEpic,
  logoutEpic,
  registerEpic,
  saveFormEpic,
)

export const reducer = combineReducers({
  authReducer: persistReducer(authReducerConfig, authReducer),
  formReducer
})

export type RootState = ReturnType<typeof reducer>
