import { makeDeck } from "../card-manipulation";
import {
  Deck,
  Pile,
  PlayingCard,
  PlayingCardRank,
  PlayingCardSuit,
} from "../playing-card/playing-card.interface";

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

export type EuchreCard = PlayingCard<EuchreSuit, EuchreRank>;

export type EuchrePlayerState = {
  hand: string;
  name: string;
  tablePosition: number;
  role: "M" | "m" | "d" | null;
  tricks: number;
};

export enum Phase {
  DEALING = "dealing",
  BIDDING = "bidding",
  DECLARING = "declaring",
  DISCARDING = "discarding",
  CALLING_TRUMP = "callingTrump",
  PLAYING_TRICKS = "playingTricks",
  ROUND_SCORING = "roundScoring",
  END_OF_GAME = "endOfGame",
  TRICK_SCORING = "trickScoring",
}

export enum EuchrePile {
  DECK = "deck",
  DISCARD_PILE = "discard",
  PLAYER_1 = "player1",
  PLAYER_2 = "player2",
  PLAYER_3 = "player3",
  PLAYER_4 = "player4",
  TALON = "talon",
  TABLE = "table",
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

export function getLeftBowerSuit(trump: PlayingCardSuit): PlayingCardSuit {
  switch (trump) {
    case PlayingCardSuit.DIAMONDS:
      return PlayingCardSuit.HEARTS;
    case PlayingCardSuit.HEARTS:
      return PlayingCardSuit.DIAMONDS;
    case PlayingCardSuit.SPADES:
      return PlayingCardSuit.CLUBS;
    case PlayingCardSuit.CLUBS:
      return PlayingCardSuit.SPADES;
  }
}

export const isRightBower = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  trumpSuit: PlayingCardSuit
): boolean => {
  return card.suit === trumpSuit && card.rank === "J";
};

export const isLeftBower = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  trumpSuit: PlayingCardSuit
) => {
  return card.suit === getLeftBowerSuit(trumpSuit) && card.rank === "J";
};

export const getEuchreCardValue = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  trumpSuit: PlayingCardSuit,
  leadingSuit: PlayingCardSuit
): number => {
  const rankValues: Record<EuchreRank, number> = {
    "9": 1,
    "10": 2,
    J: 3,
    Q: 4,
    K: 5,
    A: 6,
  };

  const sameColorSuit = (suit: PlayingCardSuit): PlayingCardSuit => {
    switch (suit) {
      case PlayingCardSuit.HEARTS:
        return PlayingCardSuit.DIAMONDS;
      case PlayingCardSuit.DIAMONDS:
        return PlayingCardSuit.HEARTS;
      case PlayingCardSuit.CLUBS:
        return PlayingCardSuit.SPADES;
      case PlayingCardSuit.SPADES:
        return PlayingCardSuit.CLUBS;
    }
  };

  if (card.rank === "J" && card.suit === trumpSuit) {
    return 200; // Right bower
  }

  if (card.rank === "J" && card.suit === sameColorSuit(trumpSuit)) {
    return 150; // Left bower
  }

  if (card.suit === trumpSuit) {
    return 100 + rankValues[card.rank]; // Other trump cards
  }

  if (card.suit === leadingSuit) {
    return 50 + rankValues[card.rank]; // Leading suit cards
  }

  return rankValues[card.rank]; // Other cards
};

export interface EuchreGameState {
  currentPlayer: number;
  leadingPlayer: number;
  trickLeader: number;
  team1Score: number;
  team2Score: number;
  trump: EuchreSuit | null;
  trumpCandidates: Array<EuchreSuit>;
  leadingSuit: EuchreSuit | null;
  dealer: number;
  phase: Phase;
  piles: Record<string, Pile<EuchreSuit, EuchreRank>>;
  players: Array<EuchrePlayerState>;
  benchedPlayers: Array<EuchrePlayerState | null>;
}

export const player1State: EuchrePlayerState = {
  hand: "player1",
  name: "Player 1",
  tablePosition: 0,
  role: null,
  tricks: 0,
};

export const player2State: EuchrePlayerState = {
  hand: "player2",
  name: "Player 2",
  tablePosition: 1,
  role: null,
  tricks: 0,
};

export const player3State: EuchrePlayerState = {
  hand: "player3",
  name: "Player 3",
  tablePosition: 2,
  role: null,
  tricks: 0,
};

export const player4State: EuchrePlayerState = {
  hand: "player4",
  name: "Player 4",
  tablePosition: 3,
  role: null,
  tricks: 0,
};

const firstDealer = Math.floor(Math.random() * 4);

export const initialState = (dealer = firstDealer): EuchreGameState => ({
  currentPlayer: dealer,
  dealer,
  trickLeader: (dealer + 1) % 4,
  leadingPlayer: (dealer + 1) % 4,
  team1Score: 0,
  team2Score: 0,
  trump: null,
  trumpCandidates: suits,
  leadingSuit: null,
  phase: Phase.DEALING,
  piles: {
    deck: makeDeck(suits, ranks),
    discard: [],
    talon: [],
    table: [],
    player1: [],
    player2: [],
    player3: [],
    player4: [],
  },
  players: [player1State, player2State, player3State, player4State],
  benchedPlayers: [null, null, null, null],
});

export type { Pile } from "../playing-card/playing-card.interface";
export { PlayingCardSuit } from "../playing-card/playing-card.interface";
