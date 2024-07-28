import { Phase } from "../..";
import { benchPlayer, transitionToPhase } from "../../reducers/euchre";
import { AppThunk } from "../../store";

export const declare =
  (declaration: "alone" | null = null): AppThunk =>
  (dispatch) => {
    if (declaration === "alone") {
      dispatch(benchPlayer());
    }

    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
  };
