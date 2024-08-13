import { Phase, PlayingCardSuit } from "../..";
import { setRole, setTrump, transitionToPhase } from "../../reducers/euchre";
import { AppThunk } from "../../store";

export const callTrump =
  (playerPointer: number, trump: PlayingCardSuit): AppThunk =>
  (dispatch) => {
    dispatch(setTrump(trump));
    dispatch(setRole({ makerPointer: playerPointer }));
    dispatch(transitionToPhase(Phase.DECLARING));
  };
