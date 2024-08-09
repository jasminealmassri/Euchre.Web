import { Phase, PlayerType, PlayingCardSuit } from "../..";
import { useEuchreSelector } from "../../hooks";
import {
  nextPlayer,
  setCurrentPlayer,
  setRole,
  setTrump,
  sortPile,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealerPointer, selectPlayers } from "../../selectors/euchre";
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
