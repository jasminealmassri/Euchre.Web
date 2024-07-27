import { createListenerMiddleware } from "@reduxjs/toolkit";

import { scoreRound, scoreTrick } from "../reducers/euchre";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: scoreTrick,
  effect: (action, listenerApi) => {
    console.log("Time to score the trick!");

    listenerApi.cancelActiveListeners();
  },
});

listenerMiddleware.startListening({
  actionCreator: scoreRound,
  effect: (action, listenerApi) => {
    console.log("Time to score the round!");

    listenerApi.cancelActiveListeners();
  },
});

export default listenerMiddleware;
