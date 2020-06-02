import { configureStore, getDefaultMiddleware, AnyAction } from '@reduxjs/toolkit'
import { rootEpic, reducer, RootState } from './root'
import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();
const middleware = [...getDefaultMiddleware(), epicMiddleware]

export const store = configureStore({
  reducer,
  middleware
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch
export default store