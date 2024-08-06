import { createListenerMiddleware } from "@reduxjs/toolkit";

import { scoreRound, scoreTrick, transitionToPhase } from "../reducers/euchre";
import { RootState } from "../store";
import { Phase } from "../../lib/euchre";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: scoreTrick,
  effect: (_, listenerApi) => {
    console.log("Time to score the trick!");

    listenerApi.cancelActiveListeners();
  },
});

listenerMiddleware.startListening({
  actionCreator: scoreRound,
  effect: (_, listenerApi) => {
    const { euchre } = listenerApi.getState() as RootState;

    if (euchre.team1Score >= 10 || euchre.team2Score >= 10) {
      listenerApi.dispatch(transitionToPhase(Phase.END_OF_GAME));
    } else {
      listenerApi.dispatch(transitionToPhase(Phase.DEALING));
    }

    listenerApi.cancelActiveListeners();
  },
});

export default listenerMiddleware;
