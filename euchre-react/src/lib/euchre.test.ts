import { expect, test } from "vitest";

import { dealCards } from "./euchre-slice";
import { Phase, ranks, suits } from "./euchre.interface";
import { makeDeck, shuffle, takeTopCard } from "./card-manipulation";
import { store } from "./store";

const euchreDeck = makeDeck(suits, ranks);

test("deal", () => {
  store.dispatch(dealCards());

  const state = store.getState().euchre;
  const [upCard] = takeTopCard(state.talon);

  expect(state.deck.length).toBe(3);
  expect(state.players[0].hand.length).toBe(5);
  expect(state.players[1].hand.length).toBe(5);
  expect(state.players[2].hand.length).toBe(5);
  expect(state.players[3].hand.length).toBe(5);

  expect(state.talon.length).toBe(1);
  expect(upCard?.faceUp).toBe(true);

  expect(state.phase).toBe(Phase.BIDDING);
});

test("make euchre deck", () => {
  expect(euchreDeck.length).toBe(24);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(euchreDeck);

  expect(shuffledDeck).not.toEqual(euchreDeck);
});
