import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { takeCardAt } from "./card-manipulation";
import {
  compareEuchreCards,
  EuchreCard,
  EuchreGameState,
  EuchrePile,
  EuchreRank,
  EuchreSuit,
  getLeftBowerSuit,
  handParameters,
  initialState,
  isLeftBower,
  nextPhase,
  Phase,
} from "./euchre.interface-old";
import { Pile, PlayingCardSuit } from "./playing-card/playing-card.interface";
import { AppThunk } from "../state/store";
import { range } from "./utils";

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
export const selectCanCallTrump =
  (player: number) => (state: EuchreGameState) =>
    state.currentPlayer === player && state.phase === Phase.CALLING_TRUMP;
export const selectMustCallTrump =
  (player: number) => (state: EuchreGameState) =>
    state.dealer === player && state.phase === Phase.CALLING_TRUMP;
export const selectLeftBower = (state: EuchreGameState) => {
  return getLeftBowerSuit(state.trump as PlayingCardSuit);
};
export const selectSuit = (card: EuchreCard) => (state: EuchreGameState) => {
  return isLeftBower(card, state.trump as PlayingCardSuit)
    ? state.trump
    : card.suit;
};
export const selectTeam1Score = (state: EuchreGameState) =>
  state.players[0].tricks + state.players[2].tricks;

export const selectTeam2Score = (state: EuchreGameState) =>
  state.players[1].tricks + state.players[3].tricks;

export const selectHighestCard =
  (pile: Pile<PlayingCardSuit, EuchreRank>) => (state: EuchreGameState) => {
    const trump = state.trump as PlayingCardSuit;
    const leadingSuit = state.leadingSuit as PlayingCardSuit;

    return pile.reduce((highestIndex, currentCard, currentIndex) => {
      return compareEuchreCards(
        currentCard,
        pile[highestIndex],
        trump,
        leadingSuit
      ) > 0
        ? currentIndex
        : highestIndex;
    }, 0);
  };

// actions
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
      dispatch(incrementPlayerTrick());

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

export const euchreSlice = createSlice({
  name: "euchre",
  initialState: initialState(),
  reducers: {
    // game actions
    cleanUp: (state) => {
      const { dealer, team1Score, team2Score } = state;
      return {
        ...initialState((dealer + 1) % state.players.length),
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
    },
    incrementPlayerTrick: (state) => {
      const winningCardIndex = selectHighestCard(state.piles[EuchrePile.TABLE])(
        state
      );

      const winningPlayerIndex =
        (state.leadingPlayer + winningCardIndex) % state.players.length;

      state.players[winningPlayerIndex].tricks += 1;
      state.leadingPlayer = winningPlayerIndex;
      state.currentPlayer = winningPlayerIndex;
    },
    scoreRound: (state) => {
      const team1Score = state.players[0].tricks + state.players[2].tricks;
      const team2Score = state.players[1].tricks + state.players[3].tricks;

      team1Score > team2Score
        ? (state.team1Score += 1)
        : (state.team2Score += 1);
    },
    transitionToPhase: (state, action: PayloadAction<Phase>) => {
      state.phase = action.payload;
    },
    nextPlayer(state) {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },
    setCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.currentPlayer = action.payload;
    },
    resetState: () => initialState(),
    setLeadingSuit: (state, action: PayloadAction<EuchreSuit>) => {
      state.leadingSuit = action.payload;
    },
    setNextDealer: (state) => {
      state.dealer = (state.dealer + 1) % state.players.length;
    },
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
    removeCandidate: (state, action: PayloadAction<PlayingCardSuit>) => {
      const remaining = state.trumpCandidates.filter(
        (suit) => suit !== action.payload
      );
      state.trumpCandidates = remaining;
    },
    shuffle: (state, action: PayloadAction<{ pile: string }>) => {
      const { pile } = action.payload;
      const cards = selectPile(pile)(state);

      state.piles[pile] = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
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
  },
});

export const {
  cleanUp,
  discardTrick,
  incrementPlayerTrick,
  moveCard,
  nextPlayer,
  playCardByIndex,
  removeCandidate,
  resetState,
  scoreRound,
  setCurrentPlayer,
  setLeadingSuit,
  setNextDealer,
  setTrump,
  shuffle,
  transitionToNextPhase,
  transitionToPhase,
} = euchreSlice.actions;
export default euchreSlice.reducer;