import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { takeCardAt } from "./card-manipulation";
import {
  EuchreGameState,
  EuchrePile,
  EuchreSuit,
  handParameters,
  initialState,
  nextPhase,
  Phase,
} from "./euchre.interface";
import { AppThunk } from "./store";
import { getLastTurnIndex, nextIndex, range } from "./utils";

// selectors
export const selectCurrentPlayer = (state: EuchreGameState) =>
  state.currentPlayer;
export const selectDealer = (state: EuchreGameState) => state.dealer;
export const selectPile = (pile: string) => (state: EuchreGameState) =>
  state.piles[pile];
export const selectPhase = (state: EuchreGameState) => state.phase;
export const selectPlayerHand = (player: number) => (state: EuchreGameState) =>
  state.players[player].hand;
export const selectPlayers = (state: EuchreGameState) => state.players;
export const selectPlayer = (player: number) => (state: EuchreGameState) =>
  state.players[player];
export const selectCanBid = (player: number) => (state: EuchreGameState) =>
  state.currentPlayer === player && state.phase === Phase.BIDDING;
export const selectCanDeal = (player: number) => (state: EuchreGameState) =>
  state.currentPlayer === player && state.phase === Phase.DEALING;
export const selectCanPlay = (player: number) => (state: EuchreGameState) =>
  state.currentPlayer === player && state.phase === Phase.PLAYING_TRICKS;
export const selectMustDiscard = (player: number) => (state: EuchreGameState) =>
  state.currentPlayer === player && state.phase === Phase.DISCARDING;

// discard thunk
export const discard =
  (cardIndex: number, player: string): AppThunk =>
  (dispatch) => {
    dispatch(takeCardFrom({ index: cardIndex, pile: player }));
    dispatch(transitionToPhase(Phase.PLAYING_TRICKS));
    dispatch(nextPlayer());
  };

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

export const pass = (): AppThunk => (dispatch, getState) => {
  const state = getState().euchre;
  const currentPlayer = selectCurrentPlayer(state);
  const dealer = selectDealer(state);
  const players = selectPlayers(state);
  const lastTurnIndex = getLastTurnIndex(dealer, players.length);

  dispatch(nextPlayer());

  if (currentPlayer === nextIndex(players.length, lastTurnIndex)) {
    dispatch(
      moveCard({ source: EuchrePile.TALON, target: EuchrePile.DISCARD_PILE })
    );
    dispatch(transitionToPhase(Phase.CALLING_TRUMP));
  }
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
    setTrump: (state, action: PayloadAction<EuchreSuit>) => {
      state.trump = action.payload;
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
      const cards = selectPile(pile)(state);

      state.piles[pile] = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    takeCardFrom: (
      state,
      action: PayloadAction<{ index: number; pile: string }>
    ) => {
      const { index, pile } = action.payload;

      const [card, remainingPile] = takeCardAt(index, state.piles[pile]);

      state.piles[pile] = remainingPile;
      card
        ? (state.piles[EuchrePile.DISCARD_PILE] = [
            card,
            ...state.piles[EuchrePile.DISCARD_PILE],
          ])
        : null;
    },
  },
});

export const {
  moveCard,
  nextPlayer,
  resetState,
  setCurrentPlayer,
  setTrump,
  shuffle,
  takeCardFrom,
  transitionToPhase,
  transitionToNextPhase,
} = euchreSlice.actions;
export default euchreSlice.reducer;
