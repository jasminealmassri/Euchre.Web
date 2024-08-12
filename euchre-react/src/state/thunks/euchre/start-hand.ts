import { EuchrePile, handParameters, Phase, utils } from "../..";
import {
  cleanUp,
  moveCard,
  nextPlayer,
  shuffle,
  transitionToPhase,
} from "../../reducers/euchre";
import { AppThunk } from "../../store";

export const startHand = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  if (state.piles[EuchrePile.TABLE].length === 4) {
    dispatch(cleanUp());
  }
  dispatch(shuffle({ pile: EuchrePile.DECK }));

  handParameters.dealPattern.forEach(([player, numberOfCards]) => {
    utils.range(numberOfCards).forEach(() => {
      dispatch(
        moveCard({ source: EuchrePile.DECK, target: `player${player}` })
      );
    });
  });

  dispatch(
    moveCard({
      source: EuchrePile.DECK,
      target: EuchrePile.TALON,
      faceUp: true,
    })
  );
  dispatch(transitionToPhase(Phase.BIDDING));
  dispatch(nextPlayer());
};
