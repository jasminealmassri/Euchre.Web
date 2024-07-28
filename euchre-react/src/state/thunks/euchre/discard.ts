import { EuchrePile, Phase } from "../..";
import {
  nextPlayer,
  playCardByIndex,
  transitionToPhase,
} from "../../reducers/euchre";
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
