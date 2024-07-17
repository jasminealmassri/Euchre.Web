import { makeDeck, shuffle } from "./card-manipulation";
import {
  Deck,
  Pile,
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
  hand: Pile<EuchreSuit, EuchreRank>;
};

export enum Phase {
  DEALING = "dealing",
  BIDDING = "bidding",
  CALLING_TRUMP = "callingTrump",
  PLAYING_TRICKS = "playingTricks",
  ROUND_SCORING = "roundScoring",
  END_OF_GAME = "endOfGame",
}

export interface EuchreGameState {
  phase: Phase;
  deck: Deck<EuchreSuit, EuchreRank>;
  talon: Pile<EuchreSuit, EuchreRank>;
  players: EuchrePlayerState[];
  currentPlayer: number;
}

export const player1State: EuchrePlayerState = {
  name: "Player 1",
  tricks: 0,
  hand: [] as Pile<EuchreSuit, EuchreRank>,
};

export const player2State: EuchrePlayerState = {
  name: "Player 2",
  tricks: 0,
  hand: [] as Pile<EuchreSuit, EuchreRank>,
};

export const player3State: EuchrePlayerState = {
  name: "Player 3",
  tricks: 0,
  hand: [] as Pile<EuchreSuit, EuchreRank>,
};

export const player4State: EuchrePlayerState = {
  name: "Player 4",
  tricks: 0,
  hand: [] as Pile<EuchreSuit, EuchreRank>,
};

export const initialState: EuchreGameState = {
  phase: Phase.DEALING,
  deck: shuffle(makeDeck(suits, ranks)),
  talon: [] as Pile<EuchreSuit, EuchreRank>,
  currentPlayer: Math.floor(Math.random() * 4),
  players: [player1State, player2State, player3State, player4State],
};
