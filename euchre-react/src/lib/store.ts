import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import euchreReducer from "./euchre-slice";

export const store = configureStore({
  reducer: {
    euchre: euchreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
