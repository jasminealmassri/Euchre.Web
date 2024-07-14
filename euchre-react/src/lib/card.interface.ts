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

export type Deck<T> = Card<T>[];

export const makeDeck = <R>(suits: Suits[], ranks: R[]): Deck<R> =>
  suits.reduce(
    (deck: Deck<R>, suit: Suits) =>
      ranks.reduce(
        (deck: Deck<R>, rank: R) => deck.concat({ suit, rank } as Card<R>),
        deck
      ),
    []
  );

export const shuffle = <T>(deck: Card<T>[]): Card<T>[] =>
  deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
