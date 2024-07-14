import { expect, test } from "vitest";

import {
  PlayingCardRanks,
  PlayingCardSuits,
  makeDeck,
  shuffle,
  take,
  takeTopCard,
} from "./playing-card.interface";

type Suit = PlayingCardSuits;

type ExcludedRank = PlayingCardRanks.JOKER;
type Rank = Exclude<PlayingCardRanks, ExcludedRank>;

const suits: Suit[] = [
  PlayingCardSuits.DIAMONDS,
  PlayingCardSuits.CLUBS,
  PlayingCardSuits.HEARTS,
  PlayingCardSuits.SPADES,
];

const ranks: Rank[] = [
  PlayingCardRanks.TWO,
  PlayingCardRanks.THREE,
  PlayingCardRanks.FOUR,
  PlayingCardRanks.FIVE,
  PlayingCardRanks.SIX,
  PlayingCardRanks.SEVEN,
  PlayingCardRanks.EIGHT,
  PlayingCardRanks.NINE,
  PlayingCardRanks.TEN,
  PlayingCardRanks.JACK,
  PlayingCardRanks.QUEEN,
  PlayingCardRanks.KING,
  PlayingCardRanks.ACE,
];

const standardDeck = makeDeck<Suit, Rank>(suits, ranks);

test("make deck", () => {
  expect(standardDeck.length).toBe(52);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(standardDeck);

  expect(shuffledDeck).not.toEqual(standardDeck);
});

test("take top card", () => {
  const [newPile, originalPile] = takeTopCard(standardDeck);
  const topCard = newPile[0];

  expect(newPile.length).toBe(1);
  expect(originalPile.length).toBe(51);

  expect(topCard?.suit).toBe(suits[0]);
  expect(topCard?.rank).toBe(ranks[0]);
});

test("take top card from empty deck", () => {
  const deck = makeDeck([], []);
  const [newPile, originalPile] = takeTopCard(deck);
  const topCard = newPile[0];

  expect(newPile.length).toBe(0);
  expect(originalPile.length).toBe(0);
  expect(topCard).toBeUndefined();
});

test("take top n cards", () => {
  const [newPile, originalPile] = take(5, standardDeck);

  expect(newPile.length).toBe(5);
  expect(originalPile.length).toBe(47);
});
