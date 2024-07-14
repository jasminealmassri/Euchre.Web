import { expect, test } from "vitest";

import { makeDeck, shuffle } from "./playing-card.interface";
import { ranks, suits } from "./euchre.interface";

const euchreDeck = makeDeck(suits, ranks);

test("make euchre deck", () => {
  expect(euchreDeck.length).toBe(24);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(euchreDeck);

  expect(shuffledDeck).not.toEqual(euchreDeck);
});
