import { EuchrePile, EuchreSuit, Phase, getLastPlayer } from "../../";
import {
  cleanUp,
  discardTrick,
  nextPlayer,
  playCardByIndex,
  scoreRound,
  scoreTrick,
  setLeadingSuit,
  transitionToPhase,
} from "../../reducers/euchre";
import { selectPlayerHand, selectSuit } from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const playCard =
  (player: number, card: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState().euchre;
    const playerHandPointer = selectPlayerHand(player)(state);
    const playerHand = state.piles[playerHandPointer];
    const desiredCard = playerHand[card];
    const actualSuit = selectSuit(desiredCard)(state);
    const leadingSuit = state.leadingSuit ?? actualSuit;
    const lastPlayer = getLastPlayer(state);
    const hasLeadingSuit = playerHand.find(
      (card) => selectSuit(card)(state) === leadingSuit
    );

    if (actualSuit !== leadingSuit && hasLeadingSuit) {
      return;
    }

    if (!state.leadingSuit) dispatch(setLeadingSuit(leadingSuit as EuchreSuit));

    dispatch(
      playCardByIndex({
        index: card,
        source: playerHandPointer,
        target: EuchrePile.TABLE,
        faceUp: true,
      })
    );
    dispatch(nextPlayer());

    if (player === lastPlayer) {
      dispatch(transitionToPhase(Phase.TRICK_SCORING));
      dispatch(scoreTrick());

      if (playerHand.length === 1) {
        setTimeout(() => {
          dispatch(scoreRound());
          dispatch(cleanUp());
          dispatch(transitionToPhase(Phase.DEALING));
        }, 2000);
      } else {
        setTimeout(() => {
          dispatch(discardTrick());
          dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
        }, 2000);
      }
    }
  };
