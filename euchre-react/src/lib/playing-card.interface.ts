export enum PlayingCardSuit {
  DIAMONDS = "diamonds",
  SPADES = "spades",
  CLUBS = "clubs",
  HEARTS = "hearts",
}

export enum PlayingCardRank {
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
  ACE = "A",
  JOKER = "Joker",
}

export const suitToColor = (suit: PlayingCardSuit) => {
  switch (suit) {
    case PlayingCardSuit.CLUBS:
      return "black";
    case PlayingCardSuit.DIAMONDS:
      return "red";
    case PlayingCardSuit.HEARTS:
      return "red";
    case PlayingCardSuit.SPADES:
      return "black";
  }
};

export interface PlayingCard<S, R> {
  suit: S;
  rank: R;
  faceUp: boolean;
}

export type Pile<S, R> = PlayingCard<S, R>[];
export type Deck<S, R> = Pile<S, R>;
