import { EuchrePile, Phase } from "../..";
import {
  moveCard,
  setCurrentPlayer,
  setTrump,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealer, selectPlayerHand } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const orderUp = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const dealer = selectDealer(state);
  const dealerHand = selectPlayerHand(dealer)(state);

  dispatch(setTrump(state.piles.talon[0].suit));
  dispatch(
    moveCard({
      source: EuchrePile.TALON,
      target: dealerHand,
      faceUp: false,
    })
  );
  dispatch(setCurrentPlayer(dealer));
  dispatch(transitionToPhase(Phase.DISCARDING));
};
