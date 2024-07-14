export enum Suits {
  DIAMONDS = "diamonds",
  SPADES = "spades",
  CLUBS = "clubs",
  HEARTS = "hearts",
}

export enum Ranks {
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

export interface Card<T> {
  suit: Suits;
  rank: T;
}

export type Pile<T> = Card<T>[];
export type Deck<T> = Pile<T>;

export const makeDeck = <R>(suits: Suits[], ranks: R[]): Deck<R> =>
  suits.reduce(
    (deck: Deck<R>, suit: Suits) => [
      ...deck,
      ...ranks.map((rank: R) => ({ suit, rank })),
    ],
    []
  );

export const shuffle = <T>(pile: Pile<T>): Pile<T> =>
  pile
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
