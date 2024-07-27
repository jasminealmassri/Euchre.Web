import { Phase, PlayingCardSuit } from "../..";
import {
  nextPlayer,
  setCurrentPlayer,
  setTrump,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealer } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const callTrump =
  (trump: PlayingCardSuit): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealer(getState().euchre);
    dispatch(setTrump(trump));
    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
  };
