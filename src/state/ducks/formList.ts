import {
  AnyAction,
  createSlice,
} from "@reduxjs/toolkit"
import { Epic } from "redux-observable";
import { filter, mergeMap  } from "rxjs/operators";
import { apiClient } from '../wrappers/api'
import { IForm } from './form'

const initialState = {
  formList: [] as IForm[],
  isLoading: false
}

export const formListSlice = createSlice({
  name: 'formList',
  initialState,
  reducers: {
    formListRequest: (state) => ({...state, isLoading: true}),
    formListSuccess: (state, action) => ({
      ...state,
      formList: action.payload,
      isLoading: false,
    }),
    formListFailure: (state, action) => ({
      ...state,
      isLoading: false,
    })
  }
});

export const { formListRequest } = formListSlice.actions
export const formListReducer = formListSlice.reducer

export const getFormListEpic: Epic<AnyAction, AnyAction, ReturnType<typeof formListReducer>> = (action$, store) => action$.pipe(
  filter(formListSlice.actions.formListRequest.match),
  mergeMap( () => {
      return apiClient({
          url: "forms/",
          method: "GET",
          errorAction: formListSlice.actions.formListFailure,
          successAction: formListSlice.actions.formListSuccess,
      })
  })
)
