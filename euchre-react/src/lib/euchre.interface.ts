import {
  Deck,
  PlayingCardRanks,
  PlayingCardSuits,
} from "./playing-card.interface";

export type EuchreSuit =
  | PlayingCardSuits.DIAMONDS
  | PlayingCardSuits.CLUBS
  | PlayingCardSuits.HEARTS
  | PlayingCardSuits.SPADES;
export type EuchreRank =
  | PlayingCardRanks.NINE
  | PlayingCardRanks.TEN
  | PlayingCardRanks.JACK
  | PlayingCardRanks.QUEEN
  | PlayingCardRanks.KING
  | PlayingCardRanks.ACE;

export const ranks: EuchreRank[] = [
  PlayingCardRanks.NINE,
  PlayingCardRanks.TEN,
  PlayingCardRanks.JACK,
  PlayingCardRanks.QUEEN,
  PlayingCardRanks.KING,
  PlayingCardRanks.ACE,
];

export const suits: EuchreSuit[] = [
  PlayingCardSuits.DIAMONDS,
  PlayingCardSuits.CLUBS,
  PlayingCardSuits.HEARTS,
  PlayingCardSuits.SPADES,
];

export type EuchrePlayerState = {
  name: string;
  tricks: number;
  hand: Deck<EuchreSuit, EuchreRank>;
};

export enum Phases {
  DEALING = "dealing",
  BIDDING = "bidding",
  CALLING_TRUMP = "callingTrump",
  PLAYING_TRICKS = "playingTricks",
  ROUND_SCORING = "roundScoring",
  END_OF_GAME = "endOfGame",
}

interface EuchreGameState {
  phase: Phases;
  deck: Deck<EuchreSuit, EuchreRank>[];
}

export const gameState: EuchreGameState = {
  phase: Phases.DEALING,
  deck: [],
};

export const playerState: EuchrePlayerState = {
  name: "",
  tricks: 0,
  hand: [],
};
