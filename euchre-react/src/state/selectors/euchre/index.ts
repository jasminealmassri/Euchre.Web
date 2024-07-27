import {
  EuchreCard,
  EuchreGameState,
  EuchreRank,
  Phase,
  Pile,
  PlayingCardSuit,
  getEuchreCardValue,
  getLeftBowerSuit,
  isLeftBower,
} from "../../";

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

export const selectHighestCard =
  (pile: Pile<PlayingCardSuit, EuchreRank>) => (state: EuchreGameState) => {
    const trump = state.trump as PlayingCardSuit;
    const leadingSuit = state.leadingSuit as PlayingCardSuit;

    const highestValueAndIndex: { value: number; index: number } = pile.reduce<{
      value: number;
      index: number;
    }>(
      (highestRanked, currentCard, currentIndex) => {
        const value = getEuchreCardValue(currentCard, trump, leadingSuit);
        return value > highestRanked.value
          ? { value, index: currentIndex }
          : highestRanked;
      },
      { value: 0, index: 0 }
    );

    return highestValueAndIndex.index;
  };
