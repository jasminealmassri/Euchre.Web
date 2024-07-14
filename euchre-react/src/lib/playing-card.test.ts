import { expect, test } from "vitest";

import {
  PlayingCardRank,
  PlayingCardSuit,
  insertCardAt,
  makeDeck,
  placeCardOnTop,
  placeOnBottom,
  placeOnTop,
  shuffle,
  takeBottomCard,
  takeCardAt,
  takeFromBottom,
  takeFromIndex,
  takeFromTop,
  takeTopCard,
} from "./playing-card.interface";

type Suit = PlayingCardSuit;
type ExcludedRank = PlayingCardRank.JOKER;
type Rank = Exclude<PlayingCardRank, ExcludedRank>;

const suits: Suit[] = Object.values(PlayingCardSuit);
const ranks: Rank[] = Object.values(PlayingCardRank).filter(
  (rank) => rank !== PlayingCardRank.JOKER
) as Rank[];

const standardDeck = makeDeck<Suit, Rank>(suits, ranks);

test("make deck", () => {
  expect(standardDeck.length).toBe(52);
});

test("shuffle deck", () => {
  const shuffledDeck = shuffle(standardDeck);

  expect(shuffledDeck).not.toEqual(standardDeck);
});

test("take top card", () => {
  const [topCard, originalPile] = takeTopCard(standardDeck);

  expect(originalPile.length).toBe(51);

  expect(topCard?.suit).toBe(suits[0]);
  expect(topCard?.rank).toBe(ranks[0]);
});

test("take top n cards", () => {
  const [newPile, originalPile] = takeFromTop(5, standardDeck);

  expect(newPile.length).toBe(5);
  expect(originalPile.length).toBe(47);
});

test("take top card from empty deck", () => {
  const deck = makeDeck([], []);
  const [topCard, originalPile] = takeTopCard(deck);

  expect(topCard).toBeUndefined();
  expect(originalPile.length).toBe(0);
  expect(topCard).toBeUndefined();
});

test("take bottom card", () => {
  const [newPile, originalPile] = takeFromBottom(1, standardDeck);
  const bottomCard = newPile[0];

  expect(newPile.length).toBe(1);
  expect(originalPile.length).toBe(51);

  expect(bottomCard?.suit).toBe(suits[suits.length - 1]);
  expect(bottomCard?.rank).toBe(ranks[ranks.length - 1]);
});

test("take bottom n cards", () => {
  const [newPile, originalPile] = takeFromBottom(5, standardDeck);

  expect(newPile.length).toBe(5);
  expect(originalPile.length).toBe(47);
});

test("take bottom card from empty deck", () => {
  const deck = makeDeck([], []);
  const [bottomCard, originalPile] = takeBottomCard(deck);

  expect(bottomCard).toBeUndefined();
  expect(originalPile.length).toBe(0);
  expect(bottomCard).toBeUndefined();
});

test("take card at index", () => {
  const [card, originalPile] = takeCardAt(26, standardDeck);

  expect(card?.suit).toBe(suits[2]);
  expect(card?.rank).toBe(ranks[0]);
  expect(originalPile.length).toBe(51);
});

test("take entire suit", () => {
  const deck = makeDeck(suits, ranks);
  const [extracted, surrounding] = takeFromIndex(13, 26, deck);
  const [topCard] = takeTopCard(extracted);
  const [bottomCard] = takeBottomCard(extracted);

  expect(extracted.length).toBe(ranks.length);
  expect(surrounding.length).toBe(deck.length - ranks.length);
  expect(topCard?.suit).toBe(suits[2]);
  expect(topCard?.rank).toBe(ranks[0]);
  expect(bottomCard?.suit).toBe(suits[2]);
  expect(bottomCard?.rank).toBe(ranks[ranks.length - 1]);
});

test("cut deck bottom to top", () => {
  const deck = makeDeck(suits, ranks);
  const cutAt = 26;
  const cutDeck = placeOnTop(takeFromBottom(cutAt, deck));
  const [topCard] = takeTopCard(cutDeck);

  expect(cutDeck.length).toBe(deck.length);

  expect(topCard?.suit).toBe(suits[2]);
  expect(topCard?.rank).toBe(ranks[0]);
});

test("cut deck top to bottom", () => {
  const deck = makeDeck(suits, ranks);
  const cutAt = 26;
  const cutDeck = placeOnBottom(takeFromTop(cutAt, deck));
  const [topCard] = takeTopCard(cutDeck);

  expect(cutDeck.length).toBe(deck.length);

  expect(topCard?.suit).toBe(suits[2]);
  expect(topCard?.rank).toBe(ranks[0]);
});

test("move top card to middle", () => {
  const deck = makeDeck(suits, ranks);
  const [topCard, originalPile] = takeTopCard(deck);
  const newPile = insertCardAt(26, topCard, originalPile);
  const [card] = takeCardAt(26, newPile);
  const [newTopCard] = takeTopCard(newPile);

  expect(newPile.length).toBe(deck.length);

  expect(card?.suit).toBe(suits[0]);
  expect(card?.rank).toBe(ranks[0]);

  expect(newTopCard?.suit).toBe(suits[0]);
  expect(newTopCard?.rank).toBe(ranks[1]);
});

test("move bottom card to the top", () => {
  // purposefully terse to show composability
  const [card, remainingPile] = takeTopCard(
    placeCardOnTop(takeBottomCard(standardDeck))
  );
  const [newBottomCard] = takeBottomCard(remainingPile);

  expect(remainingPile.length).toBe(standardDeck.length - 1);

  expect(card?.suit).toBe(suits[suits.length - 1]);
  expect(card?.rank).toBe(ranks[ranks.length - 1]);

  expect(newBottomCard?.suit).toBe(suits[suits.length - 1]);
  expect(newBottomCard?.rank).toBe(ranks[ranks.length - 2]);
});
