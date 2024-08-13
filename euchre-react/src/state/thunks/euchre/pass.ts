import { EuchrePile, Phase } from "../../";
import {
  moveCard,
  nextPlayer,
  removeCandidate,
  transitionToPhase,
} from "../../reducers/euchre";
import {
  selectCurrentPlayer,
  selectDealerPointer,
} from "../../selectors/euchre";
import { AppThunk } from "../../store";

export const pass = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const currentPlayer = selectCurrentPlayer(state);
  const dealer = selectDealerPointer(state);

  if (currentPlayer === dealer) {
    dispatch(removeCandidate(state.piles[EuchrePile.TALON][0].suit));
    dispatch(
      moveCard({ source: EuchrePile.TALON, target: EuchrePile.DISCARD_PILE })
    );
    dispatch(transitionToPhase(Phase.CALLING_TRUMP));
  }

  dispatch(nextPlayer());
};
