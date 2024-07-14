export enum PlayingCardSuits {
  DIAMONDS = "diamonds",
  SPADES = "spades",
  CLUBS = "clubs",
  HEARTS = "hearts",
}

export enum PlayingCardRanks {
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

export interface PlayingCard<S, R> {
  suit: S;
  rank: R;
}

export type Pile<S, R> = PlayingCard<S, R>[];
export type Deck<S, R> = Pile<S, R>;

export const makeDeck = <S, R>(suits: S[], ranks: R[]): Deck<S, R> =>
  suits.reduce(
    (deck: Deck<S, R>, suit: S) => [
      ...deck,
      ...ranks.map((rank: R) => ({ suit, rank })),
    ],
    []
  );

export const shuffle = <S, R>(pile: Pile<S, R>): Pile<S, R> =>
  pile
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const head = <S, R>(pile: Pile<S, R>): [PlayingCard<S, R>] | [] =>
  pile.slice(0, 1) as [PlayingCard<S, R>] | [];

export const tail = <S, R>(pile: Pile<S, R>): Pile<S, R> | [] =>
  pile.slice(1, pile.length);

export const take = <S, R>(
  n: number,
  pile: Pile<S, R>
): [Pile<S, R>, Pile<S, R>] => {
  return [pile.slice(0, n), pile.slice(n, pile.length)];
};

export const takeTopCard = <S, R>(
  pile: Pile<S, R>
): [[PlayingCard<S, R>] | [], Pile<S, R>] => [head(pile), tail(pile)];
