import { EuchrePile, Phase } from "../..";
import {
  moveCard,
  setCurrentPlayer,
  setRole,
  setTrump,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealer, selectPlayerHand } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const orderUp =
  (playerPointer: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState().euchre;
    const dealer = selectDealer(state);
    const dealerHand = selectPlayerHand(dealer)(state);

    dispatch(setTrump(state.piles.talon[0].suit));
    dispatch(setRole({ makerPointer: playerPointer }));
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
