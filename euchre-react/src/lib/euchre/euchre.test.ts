import { expect, test } from "vitest";

import { testState } from "./test-state";
import {
  EuchreGameState,
  EuchreRank,
  EuchreSuit,
  Pile,
  PlayingCardRank,
  PlayingCardSuit,
  getWinningPlayer,
} from ".";
import { selectHighestCard } from "../../state/selectors/euchre";

test("correctly map winning card to player that played it", () => {
  const winningCardIndex = 2;

  const winningPlayerIndex = getWinningPlayer(testState, winningCardIndex);

  expect(winningPlayerIndex).toBe(0);
  expect(testState.players[3].sittingOut).toBe(true);
  expect(testState.players.length).toBe(4);
});

test("correctly identifies highest rank card before and after trump", () => {
  const pileWithTrumpCards: Pile<EuchreSuit, EuchreRank> = [
    { suit: PlayingCardSuit.CLUBS, rank: PlayingCardRank.ACE, faceUp: true },
    { suit: PlayingCardSuit.CLUBS, rank: PlayingCardRank.JACK, faceUp: true },
  ];

  const highestRankedBeforeTrump = selectHighestCard(pileWithTrumpCards)({
    trump: null,
    leadingSuit: null,
  } as EuchreGameState);
  const highestRankedAfterTrump = selectHighestCard(pileWithTrumpCards)({
    trump: PlayingCardSuit.CLUBS,
    leadingSuit: null,
  } as EuchreGameState);

  expect(highestRankedBeforeTrump).toBe(0);
  expect(highestRankedAfterTrump).toBe(1);
});

test("correctly identifies highest rank card before and after leading suit", () => {
  const pileWithoutTrumpCards: Pile<EuchreSuit, EuchreRank> = [
    {
      suit: PlayingCardSuit.HEARTS,
      rank: PlayingCardRank.ACE,
      faceUp: true,
    },
    {
      suit: PlayingCardSuit.DIAMONDS,
      rank: PlayingCardRank.QUEEN,
      faceUp: true,
    },
    {
      suit: PlayingCardSuit.DIAMONDS,
      rank: PlayingCardRank.JACK,
      faceUp: true,
    },
  ];

  const highestRankedNoLeadingSuit = selectHighestCard(pileWithoutTrumpCards)({
    trump: PlayingCardSuit.CLUBS,
    leadingSuit: null,
  } as EuchreGameState);

  const highestRankedLeadingSuit = selectHighestCard(pileWithoutTrumpCards)({
    trump: PlayingCardSuit.CLUBS,
    leadingSuit: PlayingCardSuit.DIAMONDS,
  } as EuchreGameState);

  expect(highestRankedNoLeadingSuit).toBe(0);
  expect(highestRankedLeadingSuit).toBe(1);
});

test("given same ranks, returns the first highest rank found", () => {
  const sameRanks: Pile<EuchreSuit, EuchreRank> = [
    {
      suit: PlayingCardSuit.HEARTS,
      rank: PlayingCardRank.ACE,
      faceUp: true,
    },
    {
      suit: PlayingCardSuit.SPADES,
      rank: PlayingCardRank.ACE,
      faceUp: true,
    },
    {
      suit: PlayingCardSuit.DIAMONDS,
      rank: PlayingCardRank.ACE,
      faceUp: true,
    },
    {
      suit: PlayingCardSuit.CLUBS,
      rank: PlayingCardRank.ACE,
      faceUp: true,
    },
  ];

  const highestRank = selectHighestCard(sameRanks)({
    trump: null,
    leadingSuit: null,
  } as EuchreGameState);

  const highestRank2 = selectHighestCard(sameRanks.reverse())({
    trump: null,
    leadingSuit: null,
  } as EuchreGameState);

  expect(highestRank).toBe(0);
  expect(highestRank2).toBe(0);
});
