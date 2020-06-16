/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AnyAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import apiClient from '../wrappers/api';

export const titleTypes = ['body1', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption'];
export const requiredQuestionTypes = ['Short Text', 'Long Text', 'Dropdown', 'Auto Complete', 'Multiple Choice'];
export const multiAnswerQuestionTypes = ['Auto Complete', 'Checkboxes', 'Dropdown', 'Multiple Choice'];
export interface FormElement {
  created?: string,
  id: string,
  label: string,
  questionOptions: {
    label: string,
    id: string,
  }[],
  required: boolean,
  titleType?: 'body1' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  type: string,
  updated?: string,
}

export const defaultFormElements = [
  {
    type: 'Title',
    id: uuid(),
    required: false,
    label: 'Question Title',
    titleType: 'h6',
    questionOptions: [],
  },
  {
    type: 'Short Text',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [],
  },
  {
    type: 'Long Text',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [],
  },
  {
    type: 'Dropdown',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }, { label: 'Option 4' }],
  },
  {
    type: 'Auto Complete',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }, { label: 'Option 4' }],
  },
  {
    type: 'Multiple Choice',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }, { label: 'Option 4' }],
  },
  {
    type: 'Checkboxes',
    id: uuid(),
    required: false,
    label: 'Question Title',
    questionOptions: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }, { label: 'Option 4' }],
  },
] as FormElement[];

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
    deleteElement: (state, action) => ({
      ...state,
      formElements: state.formElements.filter((ele) => ele.id !== action.payload),
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

export const {
  addElement,
  deleteElement,
  saveFormRequest,
  setFormElements,
} = formSlice.actions;
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
      }, store);
    }),
  );
