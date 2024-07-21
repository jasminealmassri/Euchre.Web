import { makeDeck } from "./card-manipulation";
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

export type EuchreDeck = Deck<EuchreSuit, EuchreRank>;

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
  hand: string;
};

export enum Phase {
  DEALING = "dealing",
  BIDDING = "bidding",
  CALLING_TRUMP = "callingTrump",
  PLAYING_TRICKS = "playingTricks",
  ROUND_SCORING = "roundScoring",
  END_OF_GAME = "endOfGame",
}

export enum EuchrePile {
  DECK = "deck",
  DISCARD_PILE = "discardPile",
  PLAYER_1 = "player1",
  PLAYER_2 = "player2",
  PLAYER_3 = "player3",
  PLAYER_4 = "player4",
  TALON = "talon",
}

const phaseOrder = () => {
  return Object.values(Phase);
};

const nextPhaseIndex = (currentPhase: Phase) => {
  return phaseOrder().indexOf(currentPhase) + 1;
};

export const nextPhase = (currentPhase: Phase) => {
  return phaseOrder()[nextPhaseIndex(currentPhase)];
};

interface HandParameters {
  initialHandSize: number;
  maxHandSize: number;
  minHandSize: number;
  dealPattern: Array<[number, number]>;
}

export const handParameters: HandParameters = {
  initialHandSize: 5,
  maxHandSize: 6,
  minHandSize: 0,
  dealPattern: [
    [1, 3],
    [2, 2],
    [3, 3],
    [4, 2],
    [1, 2],
    [2, 3],
    [3, 2],
    [4, 3],
  ],
};

export interface EuchreGameState {
  currentPlayer: number;
  dealer: number;
  phase: Phase;
  piles: Record<string, Pile<EuchreSuit, EuchreRank>>;
  players: EuchrePlayerState[];
}

export const player1State: EuchrePlayerState = {
  name: "Player 1",
  tricks: 0,
  hand: "player1",
};

export const player2State: EuchrePlayerState = {
  name: "Player 2",
  tricks: 0,
  hand: "player2",
};

export const player3State: EuchrePlayerState = {
  name: "Player 3",
  tricks: 0,
  hand: "player3",
};

export const player4State: EuchrePlayerState = {
  name: "Player 4",
  tricks: 0,
  hand: "player4",
};

const dealer = Math.floor(Math.random() * 4);

export const initialState: EuchreGameState = {
  currentPlayer: dealer,
  dealer,
  phase: Phase.DEALING,
  piles: {
    deck: makeDeck(suits, ranks),
    talon: [],
    table: [],
    player1: [],
    player2: [],
    player3: [],
    player4: [],
  },
  players: [player1State, player2State, player3State, player4State],
};
