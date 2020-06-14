/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AnyAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import apiClient from '../wrappers/api';

export const titleTypes = ['body1', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption'];

export interface FormElement {
  created?: string,
  id: string,
  label: string,
  questionOptions?: {
    label: string,
  }[],
  required: boolean,
  titleType?: 'body1' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  type: string,
  updated?: string,
}

export interface IForm {
  created: string,
  formElements: FormElement[],
  id: number,
  name: string,
  updated: string,
}

export const defaultFormElement = {
  questionOptions: [{ label: 'Option 1' }],
  required: false,
  label: 'Form Title',
  type: 'Title',
} as FormElement;

const initialState = {
  formElements: [] as FormElement[],
  name: 'name',
  isLoading: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addElement: (state, action) => ({
      ...state,
      formElements: [...state.formElements, action.payload],
    }),
    setFormElements: (state, action) => ({
      ...state,
      formElements: action.payload,
    }),
    saveFormRequest: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    saveFormSuccess: (state, action) => initialState,
    saveFormFailure: (state, action) => initialState,
  },
});

export const { addElement, saveFormRequest, setFormElements } = formSlice.actions;
export const formReducer = formSlice.reducer;

export const formEpic:
  Epic<AnyAction, AnyAction, ReturnType<typeof formReducer>> = (action$, store) => action$.pipe(
    filter(formSlice.actions.saveFormRequest.match),
    mergeMap((action) => {
      const data = new FormData();
      for (const key in action.payload) {
        data.append(key, action.payload[key]);
      }
      return apiClient({
        data,
        url: 'forms/',
        method: 'POST',
        errorAction: formSlice.actions.saveFormFailure,
        successAction: formSlice.actions.saveFormSuccess,
      });
    }),
  );
