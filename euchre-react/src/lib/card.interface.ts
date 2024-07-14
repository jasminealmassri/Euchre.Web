export enum Suit {
  DIAMONDS = "diamonds",
  SPADES = "spades",
  CLUBS = "clubs",
  HEARTS = "hearts",
}

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A"
  | "Joker";

export interface Card<T> {
  suit: Suit;
  rank: T;
}

export const makeDeck = <R>(suits: Suit[], ranks: Array<R>): Card<R>[] =>
  suits.reduce(
    (deck: Card<R>[], suit: Suit) =>
      ranks.reduce(
        (deck: Card<R>[], rank: R) => deck.concat({ suit, rank } as Card<R>),
        deck
      ),
    []
  );

export const shuffle = <T>(deck: Card<T>[]): Card<T>[] =>
  deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
