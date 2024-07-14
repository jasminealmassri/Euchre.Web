import { Card, Ranks, Suits } from "./card.interface";
import { Player } from "./player.interface";

export type EuchreRank = "9" | "10" | "J" | "Q" | "K" | "A";

export const ranks: EuchreRank[] = [
  Ranks.NINE,
  Ranks.TEN,
  Ranks.JACK,
  Ranks.QUEEN,
  Ranks.KING,
  Ranks.ACE,
];

export const suits: Suits[] = [
  Suits.DIAMONDS,
  Suits.CLUBS,
  Suits.HEARTS,
  Suits.SPADES,
];

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
  deck: Card<EuchreRank>[];
}

export const gameState: EuchreGameState = {
  phase: Phases.DEALING,
  deck: [],
};

export const playerState: Player<EuchreRank> = {
  score: 0,
  hand: [],
};
