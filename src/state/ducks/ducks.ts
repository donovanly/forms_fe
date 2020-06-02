import {
    createSlice,
    PayloadAction,
    AnyAction,
} from "@reduxjs/toolkit"
import { Epic } from "redux-observable";
import { delay, filter, map } from "rxjs/operators";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0 as number
    },
    reducers: {
        increment: (state, action: PayloadAction<number>) => ({ ...state, count: state.count + action.payload }),
        decrement: (state, action: PayloadAction<number>) => ({ ...state, count: state.count - action.payload })
    }
});

export const counterReducer = counterSlice.reducer
export const countEpic: Epic<AnyAction, AnyAction, ReturnType<typeof counterReducer>> = action$ => action$.pipe(
    filter(counterSlice.actions.increment.match),
    delay(2000),
    map(action => counterSlice.actions.decrement(action.payload + 10))
);
