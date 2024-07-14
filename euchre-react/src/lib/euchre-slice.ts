import { createSlice } from "@reduxjs/toolkit";

import { initialState, Phase } from "./euchre.interface";
import { placeCardOnTop, takeTopCard } from "./playing-card.interface";

export const euchreSlice = createSlice({
  name: "euchre",
  initialState,
  reducers: {
    dealCards: (state) => {
      Array.from({ length: 5 }).forEach(() => {
        state.players.forEach((player) => {
          const [playerCard, remainingDeck] = takeTopCard(state.deck);
          player.hand = placeCardOnTop([playerCard, player.hand]);
          state.deck = remainingDeck;
        });
      });

      const [tableCard, remainingDeck] = takeTopCard(state.deck);
      state.table = placeCardOnTop([tableCard, state.table]);
      state.deck = remainingDeck;
      state.phase = Phase.BIDDING;
    },
  },
});

export const { dealCards } = euchreSlice.actions;
export default euchreSlice.reducer;
