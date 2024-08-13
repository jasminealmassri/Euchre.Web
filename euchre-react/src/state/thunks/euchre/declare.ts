import { Phase, PlayerType } from "../..";
import {
  benchPlayer,
  nextPlayer,
  setCurrentPlayer,
  sortPile,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectDealerPointer, selectPlayers } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const declare =
  (declaration: "alone" | null = null): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealerPointer(getState().euchre);

    const players = selectPlayers(getState().euchre);
    if (declaration === "alone") {
      dispatch(benchPlayer());
    }
    players.forEach((player, index) => {
      if (player.type === PlayerType.HUMAN) {
        dispatch(sortPile(`player${index + 1}`));
      }
    });

    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
  };
