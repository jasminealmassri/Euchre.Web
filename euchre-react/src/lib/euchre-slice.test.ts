import { expect, test } from "vitest";

import { selectPile, startHand } from "./euchre-slice";
import { EuchrePile, Phase, ranks, suits } from "./euchre.interface";
import { makeDeck, shuffle } from "./card-manipulation";
import { store } from "./store";
import { nextIndex } from "./utils";

const euchreDeck = makeDeck(suits, ranks);

test("make euchre deck", () => {
  const euchreDeck = selectPile(store.getState().euchre, EuchrePile.DECK);

  expect(euchreDeck.length).toBe(24);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(euchreDeck);

  expect(shuffledDeck).not.toEqual(euchreDeck);
});

test("start hand", () => {
  const startingState = store.getState().euchre;
  const numberOfPlayers = startingState.players.length;
  const startingPlayer = startingState.currentPlayer;

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
