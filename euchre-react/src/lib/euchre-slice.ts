import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  EuchreGameState,
  EuchrePile,
  handParameters,
  initialState,
  nextPhase,
} from "./euchre.interface";
import { AppThunk } from "./store";
import { range } from "./utils";

// selectors
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

export const euchreSlice = createSlice({
  name: "euchre",
  initialState,
  reducers: {
    // game actions
    nextPlayer(state) {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },
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

export const { moveCard, nextPlayer, shuffle, transitionToNextPhase } =
  euchreSlice.actions;
export default euchreSlice.reducer;
