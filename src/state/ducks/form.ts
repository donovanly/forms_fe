import {
  createSlice,
} from "@reduxjs/toolkit"

export const titleTypes = ["body1", "h1", "h2", "h3", "h4", "h5", "h6", "caption"]

export interface FormElement {
  questionOptions: {
    name: string,
  }[],
  required: boolean,
  title: string,
  titleType?: "body1" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  type: string,
}

export const defaultFormElement = {
  questionOptions: [{name: "Option 1"}],
  required: false,
  title: "Form Title",
  type: "Title",
} as FormElement

const initialState = {
  formElements: [] as FormElement[]
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
      addElement: (state, action) => ({
         ...state,
         formElements: [...state.formElements, action.payload] 
      }),
  }
});

export const { addElement } = formSlice.actions
export const formReducer = formSlice.reducer
