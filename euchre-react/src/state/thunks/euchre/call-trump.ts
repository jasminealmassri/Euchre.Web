import { Phase, PlayingCardSuit } from "../..";
import {
  nextPlayer,
  setCurrentPlayer,
  setRole,
  setTrump,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealer } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const callTrump =
  (playerPointer: number, trump: PlayingCardSuit): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealer(getState().euchre);
    dispatch(setTrump(trump));
    dispatch(setRole({ makerPointer: playerPointer }));
    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
  };
