import { beforeEach, expect, test } from "vitest";

import {
  orderUp,
  pass,
  resetState,
  selectPile,
  selectPlayers,
  startHand,
} from "./euchre-slice";
import { EuchrePile, Phase, ranks, suits } from "./euchre.interface";
import { makeDeck, shuffle } from "./card-manipulation";
import { store } from "./store";
import { nextIndex } from "./utils";

const euchreDeck = makeDeck(suits, ranks);

beforeEach(() => {
  store.dispatch(resetState());
});

test("make euchre deck", () => {
  const euchreDeck = selectPile(store.getState().euchre, EuchrePile.DECK);

  expect(euchreDeck.length).toBe(24);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(euchreDeck);

  expect(shuffledDeck).not.toEqual(euchreDeck);
});

test("start hand", () => {
  const initialState = store.getState().euchre;
  const numberOfPlayers = initialState.players.length;
  const startingPlayer = initialState.currentPlayer;

  store.dispatch(startHand());

  const updatedState = store.getState().euchre;
  const currentPlayer = updatedState.currentPlayer;
  const piles = updatedState.piles;

  expect(updatedState.phase).toBe(Phase.BIDDING);
  expect(piles.deck.length).toBe(3);
  expect(piles.player1.length).toBe(5);
  expect(piles.player2.length).toBe(5);
  expect(piles.player3.length).toBe(5);
  expect(piles.player4.length).toBe(5);
  expect(piles.talon.length).toBe(1);
  expect(piles.talon[0].faceUp).toBe(true);
  expect(currentPlayer).toBe(nextIndex(numberOfPlayers, startingPlayer));
});

test("order up", () => {
  const initialState = store.getState().euchre;
  const players = selectPlayers(initialState);

  store.dispatch(startHand());
  store.dispatch(orderUp());

  const updatedState = store.getState().euchre;

  expect(updatedState.phase).toBe(Phase.DISCARDING);
  expect(updatedState.currentPlayer).toBe(initialState.dealer);
  expect(selectPile(updatedState, EuchrePile.TALON).length).toBe(0);
  expect(
    selectPile(updatedState, players[initialState.dealer].hand).length
  ).toBe(6);
});

test("all players pass", () => {
  const initialState = store.getState().euchre;

  expect(initialState.phase).toBe(Phase.DEALING);
  expect(initialState.currentPlayer).toBe(initialState.dealer);

  store.dispatch(startHand());
  const startingHandState = store.getState().euchre;

  expect(startingHandState.phase).toBe(Phase.BIDDING);
  expect(startingHandState.currentPlayer).toBe(
    nextIndex(4, initialState.currentPlayer) // 1
  );

  store.dispatch(pass());
  const firstPassState = store.getState().euchre;

  expect(firstPassState.phase).toBe(Phase.BIDDING);
  expect(firstPassState.currentPlayer).toBe(
    nextIndex(4, startingHandState.currentPlayer) // 2
  );

  store.dispatch(pass());
  const secondPassState = store.getState().euchre;

  expect(secondPassState.phase).toBe(Phase.BIDDING);
  expect(secondPassState.currentPlayer).toBe(
    nextIndex(4, firstPassState.currentPlayer) // 3
  );

  store.dispatch(pass());
  const thirdPassState = store.getState().euchre;

  expect(thirdPassState.phase).toBe(Phase.CALLING_TRUMP);
  expect(thirdPassState.currentPlayer).toBe(
    nextIndex(4, secondPassState.currentPlayer) // dealer
  );
});
