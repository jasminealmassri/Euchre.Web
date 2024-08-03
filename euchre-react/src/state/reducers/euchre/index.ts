import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  EuchrePile,
  EuchreSuit,
  Phase,
  PlayingCardSuit,
  initialState,
  nextPhase,
  takeCardAt,
} from "../../";
import { selectHighestCard, selectPile } from "../../selectors/euchre";

export const euchreSlice = createSlice({
  name: "euchre",
  initialState: initialState(),
  reducers: {
    cleanUp: (state) => {
      const { dealer, team1Score, team2Score } = state;

      return {
        ...initialState((dealer + 1) % state.benchedPlayers.length),
        team1Score,
        team2Score,
      };
    },

    discardTrick: (state) => {
      state.piles[EuchrePile.DISCARD_PILE] = [
        ...state.piles[EuchrePile.TABLE],
        ...state.piles[EuchrePile.DISCARD_PILE],
      ];

      state.piles[EuchrePile.TABLE] = [];
      state.leadingSuit = null;
      state.trickLeader = state.currentPlayer;
    },

    scoreTrick: (state) => {
      const winningCardIndex = selectHighestCard(state.piles[EuchrePile.TABLE])(
        state
      );

      const winningPlayerIndex =
        (state.leadingPlayer + winningCardIndex) % state.players.length;

      state.players[winningPlayerIndex].tricks += 1;
      state.leadingPlayer = winningPlayerIndex;
      state.currentPlayer = winningPlayerIndex;
    },

    benchPlayer: (state) => {
      state.benchedPlayers = state.players.map((player) => {
        return player.role === "m" ? player : null;
      });
      const filteredPlayers = state.players.filter(
        (player) => player.role !== "m"
      );

      state.players = filteredPlayers;
    },

    setRole: (state, action: PayloadAction<{ makerPointer: number }>) => {
      const { makerPointer } = action.payload;
      const teamMatePointer = (makerPointer + 2) % state.players.length;

      state.players = state.players.map((player, index) => {
        switch (index) {
          case makerPointer:
            return {
              ...player,
              role: "M",
            };
          case teamMatePointer:
            return {
              ...player,
              role: "m",
            };
          default:
            return {
              ...player,
              role: "d",
            };
        }
      });
    },

    nextPlayer(state) {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },

    removeCandidate: (state, action: PayloadAction<PlayingCardSuit>) => {
      const remaining = state.trumpCandidates.filter(
        (suit) => suit !== action.payload
      );
      state.trumpCandidates = remaining;
    },

    resetState: () => initialState(),

    scoreRound: (state) => {
      const team1Score =
        state.players[0]?.tricks ?? 0 + state.players[2]?.tricks ?? 0;
      const team2Score =
        state.players[1]?.tricks ?? 0 + state.players[3]?.tricks ?? 0;

      team1Score > team2Score
        ? (state.team1Score += 1)
        : (state.team2Score += 1);
    },

    setCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.currentPlayer = action.payload;
    },

    setLeadingSuit: (state, action: PayloadAction<EuchreSuit>) => {
      state.leadingSuit = action.payload;
    },

    setNextDealer: (state) => {
      state.dealer = (state.dealer + 1) % state.players.length;
    },

    setTrump: (state, action: PayloadAction<EuchreSuit>) => {
      state.trump = action.payload;
    },

    transitionToPhase: (state, action: PayloadAction<Phase>) => {
      state.phase = action.payload;
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

    playCardByIndex: (
      state,
      action: PayloadAction<{
        index: number;
        source: string;
        target: string;
        faceUp?: boolean;
      }>
    ) => {
      const { index, source, target } = action.payload;
      const [card, remainingPile] = takeCardAt(index, state.piles[source]);

      if (card) {
        const faceUp = action.payload.faceUp ?? card.faceUp;
        state.piles[source] = remainingPile;

        state.piles[target] = [...state.piles[target], { ...card, faceUp }];
      }
    },

    shuffle: (state, action: PayloadAction<{ pile: string }>) => {
      const { pile } = action.payload;
      const cards = selectPile(pile)(state);

      state.piles[pile] = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
  },
});

export const {
  benchPlayer,
  cleanUp,
  discardTrick,
  scoreTrick,
  moveCard,
  nextPlayer,
  playCardByIndex,
  removeCandidate,
  resetState,
  scoreRound,
  setCurrentPlayer,
  setLeadingSuit,
  setNextDealer,
  setRole,
  setTrump,
  shuffle,
  transitionToNextPhase,
  transitionToPhase,
} = euchreSlice.actions;
export default euchreSlice.reducer;
