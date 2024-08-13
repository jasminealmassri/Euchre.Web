import { makeDeck, takeCardAt } from "../card-manipulation";
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

export enum PlayerType {
  HUMAN = "human",
  COMPUTER = "computer",
}

export type EuchrePlayerState = {
  hand: string;
  name: string;
  type: PlayerType;
  tablePosition: number;
  role: "M" | "m" | "d" | null;
  sittingOut: boolean;
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

export interface EuchreGameState {
  currentPlayer: number;
  leadingPlayer: number;
  team1Score: number;
  team2Score: number;
  trump: EuchreSuit | null;
  trumpCandidates: Array<EuchreSuit>;
  leadingSuit: EuchreSuit | null;
  dealer: number;
  phase: Phase;
  piles: Record<string, Pile<EuchreSuit, EuchreRank>>;
  players: Array<EuchrePlayerState>;
  // benchedPlayers: Array<EuchrePlayerState | null>;
  tablePositionsPlaying: number[];
}

export const player1State: EuchrePlayerState = {
  hand: "player1",
  name: "You",
  tablePosition: 0,
  type: PlayerType.HUMAN,
  sittingOut: false,
  role: null,
  tricks: 0,
};

export const player2State: EuchrePlayerState = {
  hand: "player2",
  name: "Jasmine",
  tablePosition: 1,
  type: PlayerType.COMPUTER,
  role: null,
  sittingOut: false,
  tricks: 0,
};

export const player3State: EuchrePlayerState = {
  hand: "player3",
  name: "Andrew",
  tablePosition: 2,
  type: PlayerType.COMPUTER,
  role: null,
  sittingOut: false,
  tricks: 0,
};

export const player4State: EuchrePlayerState = {
  hand: "player4",
  name: "Michael",
  tablePosition: 3,
  type: PlayerType.COMPUTER,
  role: null,
  sittingOut: false,
  tricks: 0,
};

const firstDealer = Math.floor(Math.random() * 4);

export const initialState = (dealer = firstDealer): EuchreGameState => ({
  currentPlayer: dealer,
  dealer,
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
  tablePositionsPlaying: [
    (dealer + 1) % 4,
    (dealer + 2) % 4,
    (dealer + 3) % 4,
    (dealer + 4) % 4,
  ],
});

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
  leadingPlayer: number;
  team1Score: number;
  team2Score: number;
  trump: EuchreSuit | null;
  trumpCandidates: Array<EuchreSuit>;
  leadingSuit: EuchreSuit | null;
  dealer: number;
  phase: Phase;
  piles: Record<string, Pile<EuchreSuit, EuchreRank>>;
  players: Array<EuchrePlayerState>;
}

// Helper functions
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

export const getSameColorSuit = (
  suit: PlayingCardSuit | null
): PlayingCardSuit | null => {
  switch (suit) {
    case PlayingCardSuit.HEARTS:
      return PlayingCardSuit.DIAMONDS;
    case PlayingCardSuit.DIAMONDS:
      return PlayingCardSuit.HEARTS;
    case PlayingCardSuit.CLUBS:
      return PlayingCardSuit.SPADES;
    case PlayingCardSuit.SPADES:
      return PlayingCardSuit.CLUBS;
    case null:
      return null;
  }
};

export const getEuchreCardValue = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  trumpSuit: PlayingCardSuit | null = null,
  leadingSuit: PlayingCardSuit | null = null
): number => {
  const rankValues: Record<EuchreRank, number> = {
    "9": 1,
    "10": 2,
    J: 3,
    Q: 4,
    K: 5,
    A: 6,
  };

  const sameColorSuit = (
    suit: PlayingCardSuit | null
  ): PlayingCardSuit | null => {
    switch (suit) {
      case PlayingCardSuit.HEARTS:
        return PlayingCardSuit.DIAMONDS;
      case PlayingCardSuit.DIAMONDS:
        return PlayingCardSuit.HEARTS;
      case PlayingCardSuit.CLUBS:
        return PlayingCardSuit.SPADES;
      case PlayingCardSuit.SPADES:
        return PlayingCardSuit.CLUBS;
      case null:
        return null;
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

export const getNextDealer = (state: EuchreGameState): number => {
  const { players } = state;
  const length = players.length;

  return (state.dealer + 1) % length;
};

export const getNextPlayer = (state: EuchreGameState): number => {
  const { players } = state;
  const length = players.length;

  const nextPlayer = (state.currentPlayer + 1) % length;
  const nextNextPlayer = (nextPlayer + 1) % length;

  return !players[nextPlayer].sittingOut ? nextPlayer : nextNextPlayer;
};

export const getLastPlayer = (state: EuchreGameState): number => {
  const { players } = state;
  const length = players.length;

  const lastPlayer = (state.leadingPlayer - 1 + length) % length;
  const lastLastPlayer = (lastPlayer - 1 + length) % length;

  return players[lastPlayer].sittingOut ? lastLastPlayer : lastPlayer;
};

export const getWinningPlayer = (
  state: EuchreGameState,
  winningCard: number
): number => {
  let adjustedIndex = winningCard;

  for (let i = 0; i < winningCard; i++) {
    const currentPlayer = (state.leadingPlayer + i) % state.players.length;
    if (state.players[currentPlayer].sittingOut) {
      adjustedIndex++;
    }
  }

  let winningPlayerIndex =
    (state.leadingPlayer + adjustedIndex) % state.players.length;
  while (state.players[winningPlayerIndex].sittingOut) {
    winningPlayerIndex = (winningPlayerIndex + 1) % state.players.length;
  }

  return winningPlayerIndex;
};

export const scoreRound = ({
  players,
}: EuchreGameState): { team1: number; team2: number } => {
  const firstPlayer = players[0];
  const makers = players.filter((player) => player.role !== "d");
  const makersTeam: 1 | 2 = firstPlayer.role?.toLowerCase() === "m" ? 1 : 2;
  const defendersTeam: 1 | 2 = firstPlayer.role === "d" ? 1 : 2;
  const wentAlone = makers.find((player) => player.sittingOut);

  const makersTricks = (makers[0]?.tricks ?? 0) + (makers[1]?.tricks ?? 0);

  let makersScore = 0;
  let defendersScore = 0;

  switch (makersTricks) {
    case 5:
      makersScore = wentAlone ? 4 : 2;
      break;
    case 4:
    case 3:
      makersScore = 1;
      break;
    case 2:
    case 1:
    case 0:
      defendersScore = 2;
      break;
    default:
      break;
  }

  return {
    [`team${makersTeam}`]: makersScore,
    [`team${defendersTeam}`]: defendersScore,
  } as { team1: number; team2: number };
};

export const getHighestCard = (
  pile: Pile<PlayingCardSuit, EuchreRank>,
  trump: PlayingCardSuit | null,
  leadingSuit: PlayingCardSuit | null
) => {
  if (pile.length === 0) {
    return -1;
  }

  const highestValueAndIndex: { value: number; index: number } = pile.reduce<{
    value: number;
    index: number;
  }>(
    (highestRanked, currentCard, currentIndex) => {
      const value = getEuchreCardValue(currentCard, trump, leadingSuit);
      return value > highestRanked.value
        ? { value, index: currentIndex }
        : highestRanked;
    },
    { value: 0, index: 0 }
  );

  return highestValueAndIndex.index;
};

export const getSortedPile = (
  pile: PlayingCard<PlayingCardSuit, EuchreRank>[],
  trump: PlayingCardSuit | null = null,
  leadingSuit: PlayingCardSuit | null = null,
  sortedPile: Pile<PlayingCardSuit, EuchreRank> = []
): PlayingCard<PlayingCardSuit, EuchreRank>[] => {
  const highestIndex = getHighestCard(pile, trump, leadingSuit);

  if (highestIndex < 0) {
    return sortedPile;
  }

  const [card, remainingCards] = takeCardAt(highestIndex, pile);

  return getSortedPile(remainingCards, trump, leadingSuit, [
    ...sortedPile,
    card,
  ] as Pile<PlayingCardSuit, EuchreRank>);
};

export const getPartnerIndex = (playerPointer: number): number => {
  return (playerPointer + 2) % 4;
};

export const getSuit = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  trump: PlayingCardSuit
): PlayingCardSuit | null => {
  return isLeftBower(card, trump) ? trump : card.suit;
};

export const getHandValue = (
  hand: PlayingCard<PlayingCardSuit, EuchreRank>[],
  trump: PlayingCardSuit | null = null,
  leadingSuit: PlayingCardSuit | null = null
): number => {
  return hand.reduce(
    (sum, card) => sum + getEuchreCardValue(card, trump, leadingSuit),
    0
  );
};

export type { Pile } from "../playing-card/playing-card.interface";
export {
  PlayingCardSuit,
  PlayingCardRank,
} from "../playing-card/playing-card.interface";
