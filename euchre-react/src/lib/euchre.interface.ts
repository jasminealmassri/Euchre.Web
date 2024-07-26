import { makeDeck } from "./card-manipulation";
import {
  Deck,
  Pile,
  PlayingCard,
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

export type EuchreCard = PlayingCard<EuchreSuit, EuchreRank>;

export type EuchrePlayerState = {
  name: string;
  tricks: number;
  hand: string;
};

export enum Phase {
  DEALING = "dealing",
  BIDDING = "bidding",
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

export function compareEuchreCards(
  card1: PlayingCard<PlayingCardSuit, EuchreRank>,
  card2: PlayingCard<PlayingCardSuit, EuchreRank>,
  trump: PlayingCardSuit
): number {
  const leftBowerSuit = getLeftBowerSuit(trump);

  const cardRank = (card: PlayingCard<PlayingCardSuit, EuchreRank>): number => {
    if (card.suit === trump) {
      if (card.rank === "J") return 10; // Right Bower
      switch (card.rank) {
        case "A":
          return 8;
        case "K":
          return 7;
        case "Q":
          return 6;
        case "10":
          return 5;
        case "9":
          return 4;
      }
    }
    if (card.suit === leftBowerSuit && card.rank === "J") {
      return 9; // Left Bower
    }
    switch (card.rank) {
      case "A":
        return 3;
      case "K":
        return 2;
      case "Q":
        return 1;
      case "J":
        return 0;
      case "10":
        return -1;
      case "9":
        return -2;
    }
    return -3; // This should not happen
  };

  const rank1 = cardRank(card1);
  const rank2 = cardRank(card2);

  return rank1 - rank2;
}

export interface EuchreGameState {
  currentPlayer: number;
  leadingPlayer: number;
  trump: EuchreSuit | null;
  trumpCandidates: EuchreSuit[];
  leadingSuit: EuchreSuit | null;
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
  leadingPlayer: (dealer + 1) % 4,
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
};
