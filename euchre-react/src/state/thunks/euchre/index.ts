import {
  EuchrePile,
  EuchreSuit,
  Phase,
  PlayingCardSuit,
  handParameters,
} from "../../";
import { AppThunk } from "../../store";
import { range } from "../../../lib/util";
import {
  cleanUp,
  discardTrick,
  scoreTrick,
  moveCard,
  nextPlayer,
  playCardByIndex,
  removeCandidate,
  scoreRound,
  setCurrentPlayer,
  setLeadingSuit,
  setTrump,
  shuffle,
  transitionToNextPhase,
  transitionToPhase,
} from "../../reducers/euchre";
import {
  selectCurrentPlayer,
  selectDealer,
  selectPlayerHand,
  selectSuit,
} from "../../selectors/euchre";

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
    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(nextPlayer());
  };

export const startHand = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  if (state.piles[EuchrePile.TABLE].length === 4) {
    dispatch(cleanUp());
  }
  dispatch(shuffle({ pile: EuchrePile.DECK }));

  handParameters.dealPattern.forEach(([player, numberOfCards]) => {
    range(numberOfCards).forEach(() => {
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
  dispatch(transitionToNextPhase());
  dispatch(nextPlayer());
};

export const orderUp = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const dealer = selectDealer(state);
  const dealerHand = selectPlayerHand(dealer)(state);

  dispatch(setTrump(state.piles.talon[0].suit));
  dispatch(
    moveCard({
      source: EuchrePile.TALON,
      target: dealerHand,
      faceUp: false,
    })
  );
  dispatch(setCurrentPlayer(dealer));
  dispatch(transitionToPhase(Phase.DISCARDING));
};

export const callTrump =
  (trump: PlayingCardSuit): AppThunk =>
  (dispatch, getState) => {
    const dealer = selectDealer(getState().euchre);
    dispatch(setTrump(trump));
    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(setCurrentPlayer(dealer));
    dispatch(nextPlayer());
  };

export const passOnTrump = (): AppThunk => (dispatch) => {
  dispatch(nextPlayer());
};

export const pass = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const currentPlayer = selectCurrentPlayer(state);
  const dealer = selectDealer(state);

  dispatch(nextPlayer());

  if (currentPlayer === dealer) {
    dispatch(removeCandidate(state.piles[EuchrePile.TALON][0].suit));
    dispatch(
      moveCard({ source: EuchrePile.TALON, target: EuchrePile.DISCARD_PILE })
    );
    dispatch(transitionToPhase(Phase.CALLING_TRUMP));
  }
};

export const playCard =
  (player: number, card: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState().euchre;
    const playerHandPointer = selectPlayerHand(player)(state);
    const playerHand = state.piles[playerHandPointer];
    const desiredCard = playerHand[card];
    const actualSuit = selectSuit(desiredCard)(state);
    const leadingSuit = state.leadingSuit ?? actualSuit;
    const lastPlayer =
      (state.leadingPlayer - 1 + state.players.length) % state.players.length;
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
