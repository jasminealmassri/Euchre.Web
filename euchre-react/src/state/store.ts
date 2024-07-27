import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import euchreReducer from "./reducers/euchre";
import listenerMiddleware from "./middleware/listener";

export const store = configureStore({
  reducer: {
    euchre: euchreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
