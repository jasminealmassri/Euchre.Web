import { Phase, PlayingCardSuit } from "../..";
import {
  nextPlayer,
  setCurrentPlayer,
  setRole,
  setTrump,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealerPointer } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const callTrump =
  (playerPointer: number, trump: PlayingCardSuit): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealerPointer(getState().euchre);

    dispatch(setTrump(trump));
    dispatch(setRole({ makerPointer: playerPointer }));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
    dispatch(transitionToPhase(Phase.DECLARING));
  };
