import { EuchrePile, Phase, PlayerType } from "../..";
import { useEuchreSelector } from "../../hooks";
import {
  nextPlayer,
  playCardByIndex,
  sortPile,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectPlayers } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const discard =
  (cardIndex: number, player: string): AppThunk =>
  (dispatch) => {
    dispatch(
      playCardByIndex({
        index: cardIndex,
        source: player,
        target: EuchrePile.DISCARD_PILE,
        faceUp: false,
      })
    );
    dispatch(nextPlayer());
    dispatch(transitionToPhase(Phase.DECLARING));
  };
