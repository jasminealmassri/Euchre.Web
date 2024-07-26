import { beforeEach, expect, test } from "vitest";

import {
  orderUp,
  pass,
  resetState,
  selectPile,
  selectPlayerHand,
  startHand,
} from "./euchre-slice-old";
import { EuchrePile, Phase, ranks, suits } from "./euchre.interface-old";
import { makeDeck, shuffle } from "./card-manipulation";
import { store } from "../state/store";
import { nextIndex } from "./util";

const euchreDeck = makeDeck(suits, ranks);

beforeEach(() => {
  store.dispatch(resetState());
});

test("make euchre deck", () => {
  const euchreDeck = selectPile(EuchrePile.DECK)(store.getState().euchre);

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

  store.dispatch(startHand());
  store.dispatch(orderUp());

  const updatedState = store.getState().euchre;

  expect(updatedState.phase).toBe(Phase.DISCARDING);
  expect(updatedState.currentPlayer).toBe(initialState.dealer);
  expect(selectPile(EuchrePile.TALON)(updatedState).length).toBe(0);
  expect(
    selectPile(selectPlayerHand(initialState.dealer)(updatedState))(
      updatedState
    ).length
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
    nextIndex(4, initialState.currentPlayer)
  );

  store.dispatch(pass());
  const firstPassState = store.getState().euchre;

  expect(firstPassState.phase).toBe(Phase.BIDDING);
  expect(firstPassState.currentPlayer).toBe(
    nextIndex(4, startingHandState.currentPlayer)
  );

  store.dispatch(pass());
  const secondPassState = store.getState().euchre;

  expect(secondPassState.phase).toBe(Phase.BIDDING);
  expect(secondPassState.currentPlayer).toBe(
    nextIndex(4, firstPassState.currentPlayer)
  );

  store.dispatch(pass());
  const thirdPassState = store.getState().euchre;

  expect(thirdPassState.phase).toBe(Phase.BIDDING);
  expect(thirdPassState.currentPlayer).toBe(
    nextIndex(4, secondPassState.currentPlayer)
  );

  store.dispatch(pass());
  const fourthPassState = store.getState().euchre;

  expect(fourthPassState.phase).toBe(Phase.CALLING_TRUMP);
  expect(fourthPassState.currentPlayer).toBe(
    nextIndex(4, thirdPassState.currentPlayer)
  );
});
