import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootEpic, reducer, RootState } from './root'
import { createEpicMiddleware } from 'redux-observable'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

// Specific actions need to be ignored for redux-persist
// please see https://github.com/rt2zz/redux-persist/issues/988
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
  epicMiddleware
]

export const store = configureStore({
  reducer,
  middleware
});
export const persistor =  persistStore(store)

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch