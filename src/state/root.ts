import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'
import { authReducer, authEpic } from './ducks/auth'
import { counterReducer, countEpic } from './ducks/ducks'

export const rootEpic = combineEpics<any>(
    authEpic,
    countEpic
)

export const reducer = combineReducers({
    authReducer,
    counterReducer
})

export type RootState = ReturnType<typeof reducer>
