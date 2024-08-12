import { Phase } from "../..";
import {
  benchPlayer,
  nextPlayer,
  setCurrentPlayer,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealerPointer } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const declare =
  (declaration: "alone" | null = null): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealerPointer(getState().euchre);

    if (declaration === "alone") {
      dispatch(benchPlayer());
    }

    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
  };
