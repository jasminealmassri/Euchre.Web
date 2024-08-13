import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  EuchrePile,
  EuchreSuit,
  Phase,
  PlayingCardSuit,
  getNextDealer,
  getNextPlayer,
  getSortedPile,
  getWinningPlayer,
  initialState,
  scoreRound as scoreEuchreRound,
  takeCardAt,
} from "../../";
import { selectHighestCard, selectPile } from "../../selectors/euchre";

export const euchreSlice = createSlice({
  name: "euchre",
  initialState: initialState(),
  reducers: {
    cleanUp: (state) => {
      const { phase, team1Score, team2Score } = state;

      return {
        ...initialState(getNextDealer(state)),
        phase,
        team1Score,
        team2Score,
      };
    },

    discardTrick: (state) => {
      const { leadingPlayer, tablePositionsPlaying } = state;

      state.piles[EuchrePile.DISCARD_PILE] = [
        ...state.piles[EuchrePile.TABLE],
        ...state.piles[EuchrePile.DISCARD_PILE],
      ];

      state.piles[EuchrePile.TABLE] = [];
      state.leadingSuit = null;
      state.tablePositionsPlaying = tablePositionsPlaying.map(
        (_position, index) => {
          return tablePositionsPlaying[
            (tablePositionsPlaying.indexOf(leadingPlayer) + index) %
              tablePositionsPlaying.length
          ];
        }
      );
    },

    scoreTrick: (state) => {
      const winningCardIndex = selectHighestCard(state.piles[EuchrePile.TABLE])(
        state
      );

      const winningPlayerIndex = getWinningPlayer(state, winningCardIndex);

      state.players[winningPlayerIndex].tricks += 1;
      state.leadingPlayer = winningPlayerIndex;
    },

    benchPlayer: (state) => {
      const { currentPlayer, piles, players, tablePositionsPlaying } = state;
      const benchedPlayerPointer = state.players.findIndex(
        (player) => player.role === "m"
      );
      const benchedPlayerHashPointer = `player${benchedPlayerPointer + 1}`;

      state.piles[EuchrePile.DISCARD_PILE] = [
        ...piles[benchedPlayerHashPointer],
        ...piles[EuchrePile.DISCARD_PILE],
      ];

      // discard benched player's hand
      state.piles[benchedPlayerHashPointer] = [];

      // move to next player if current player is benched
      state.currentPlayer =
        benchedPlayerPointer === currentPlayer
          ? getNextPlayer(state)
          : currentPlayer;

      state.players = players.map((player, index) => {
        return benchedPlayerPointer === index
          ? { ...player, sittingOut: true }
          : player;
      });

      state.tablePositionsPlaying = tablePositionsPlaying.filter(
        (_tablePosition, index) => {
          return benchedPlayerPointer !== tablePositionsPlaying[index];
        }
      );
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

    nextPlayer(state, action: PayloadAction<number | undefined>) {
      action.payload === undefined
        ? (state.currentPlayer = getNextPlayer(state))
        : (state.currentPlayer = action.payload);
    },

    // recordScore: (state, action: PayloadAction<number>) => {

    // },

    removeCandidate: (state, action: PayloadAction<PlayingCardSuit>) => {
      const remaining = state.trumpCandidates.filter(
        (suit) => suit !== action.payload
      );
      state.trumpCandidates = remaining;
    },

    resetState: () => initialState(),

    scoreRound: (state) => {
      const { team1, team2 } = scoreEuchreRound(state);

      state.team1Score += team1;
      state.team2Score += team2;
    },

    setCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.currentPlayer = action.payload;
    },

    setLeadingSuit: (state, action: PayloadAction<EuchreSuit>) => {
      state.leadingSuit = action.payload;
    },

    setNextDealer: (state) => {
      state.dealer = getNextDealer(state);
    },

    setTrump: (state, action: PayloadAction<EuchreSuit>) => {
      state.trump = action.payload;
    },

    sortPile: (state, action: PayloadAction<string>) => {
      state.piles[action.payload] = getSortedPile(
        state.piles[action.payload],
        state.trump,
        state.leadingSuit
      );
    },

    transitionToPhase: (state, action: PayloadAction<Phase>) => {
      state.phase = action.payload;
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
  sortPile,
  transitionToPhase,
} = euchreSlice.actions;
export default euchreSlice.reducer;
