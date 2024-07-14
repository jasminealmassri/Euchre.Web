import {
  Deck,
  PlayingCardRank,
  PlayingCardSuit,
} from "./playing-card.interface";

export type EuchreSuit = PlayingCardSuit;
export const suits: EuchreSuit[] = Object.values(PlayingCardSuit);

export type EuchreRank =
  | PlayingCardRank.NINE
  | PlayingCardRank.TEN
  | PlayingCardRank.JACK
  | PlayingCardRank.QUEEN
  | PlayingCardRank.KING
  | PlayingCardRank.ACE;

export const ranks: EuchreRank[] = [
  PlayingCardRank.NINE,
  PlayingCardRank.TEN,
  PlayingCardRank.JACK,
  PlayingCardRank.QUEEN,
  PlayingCardRank.KING,
  PlayingCardRank.ACE,
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
