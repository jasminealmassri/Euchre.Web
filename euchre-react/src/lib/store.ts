import { configureStore } from "@reduxjs/toolkit";

import euchreReducer from "./euchre-slice";

export const store = configureStore({
  reducer: {
    euchre: euchreReducer,
  },
});

export const AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
