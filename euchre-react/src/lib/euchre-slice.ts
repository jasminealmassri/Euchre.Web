import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  EuchreGameState,
  EuchrePile,
  handParameters,
  initialState,
  nextPhase,
  Phase,
} from "./euchre.interface";
import { AppThunk } from "./store";
import { getLastTurnIndex, range } from "./utils";

// selectors
export const selectCurrentPlayer = (state: EuchreGameState) =>
  state.currentPlayer;
export const selectDealer = (state: EuchreGameState) => state.dealer;
export const selectPile = (state: EuchreGameState, pile: string) =>
  state.piles[pile];
export const selectPhase = (state: EuchreGameState) => state.phase;
export const selectPlayers = (state: EuchreGameState) => state.players;

export const startHand = (): AppThunk => (dispatch) => {
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

  dispatch(setCurrentPlayer(dealer));
  dispatch(transitionToPhase(Phase.DISCARDING));
};

export const pass = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const currentPlayer = selectCurrentPlayer(state);
  const dealer = selectDealer(state);
  const players = selectPlayers(state);
  const lastTurnIndex = getLastTurnIndex(dealer, players.length);

  if (currentPlayer === lastTurnIndex) {
    dispatch(transitionToPhase(Phase.CALLING_TRUMP));
  }

  dispatch(nextPlayer());
};

export const euchreSlice = createSlice({
  name: "euchre",
  initialState,
  reducers: {
    // game actions
    transitionToPhase: (state, action: PayloadAction<Phase>) => {
      state.phase = action.payload;
    },
    nextPlayer(state) {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },
    setCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.currentPlayer = action.payload;
    },
    resetState: () => initialState,
    transitionToNextPhase: (state) => {
      state.phase = nextPhase(state.phase);
    },
    // pile actions
    moveCard: (
      state,
      action: PayloadAction<{
        source: string;
        target: string;
        faceUp?: boolean;
      }>
    ) => {
      const { source, target } = action.payload;
      const [card, ...remainingSource] = state.piles[source];

      state.piles[target] = [
        { ...card, faceUp: !!action.payload.faceUp },
        ...state.piles[target],
      ];
      state.piles[source] = remainingSource;
    },
    shuffle: (state, action: PayloadAction<{ pile: string }>) => {
      const { pile } = action.payload;
      const cards = selectPile(state, pile);

      state.piles[pile] = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
  },
});

export const {
  moveCard,
  nextPlayer,
  resetState,
  setCurrentPlayer,
  shuffle,
  transitionToPhase,
  transitionToNextPhase,
} = euchreSlice.actions;
export default euchreSlice.reducer;
