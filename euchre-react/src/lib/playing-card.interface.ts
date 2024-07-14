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

export const takeFromTop = <S, R>(
  n: number,
  pile: Pile<S, R>
): [Pile<S, R>, Pile<S, R>] => {
  return [pile.slice(0, n), pile.slice(n, pile.length)];
};

export const takeFromBottom = <S, R>(
  n: number,
  pile: Pile<S, R>
): [Pile<S, R>, Pile<S, R>] => {
  return [
    pile.slice(pile.length - n, pile.length),
    pile.slice(0, pile.length - n),
  ];
};

export const takeFromIndex = <S, R>(
  n: number,
  index: number,
  pile: Pile<S, R>
): [Pile<S, R>, Pile<S, R>] => {
  const [top, middle, bottom] = [
    pile.slice(0, index - 1),
    pile.slice(index, index + n),
    pile.slice(index + n - 1, pile.length),
  ];

  return [middle, [...top, ...bottom]];
};

export const takeTopCard = <S, R>(
  pile: Pile<S, R>
): [PlayingCard<S, R> | undefined, Pile<S, R>] => {
  const [p1, p2] = takeFromTop(1, pile);

  return [p1[0], p2];
};

export const takeBottomCard = <S, R>(
  pile: Pile<S, R>
): [PlayingCard<S, R> | undefined, Pile<S, R>] => {
  const [p1, p2] = takeFromBottom(1, pile);

  return [p1[0], p2];
};

export const takeCardAt = <S, R>(
  index: number,
  pile: Pile<S, R>
): [PlayingCard<S, R> | undefined, Pile<S, R>] => {
  const [middle, surrounding] = takeFromIndex(1, index, pile);

  return [middle[0], surrounding];
};

export const placeOnTop = <S, R>([source, target]: [
  Pile<S, R>,
  Pile<S, R>
]): Pile<S, R> => {
  return [...source, ...target];
};

export const placeOnBottom = <S, R>([source, target]: [
  Pile<S, R>,
  Pile<S, R>
]): Pile<S, R> => {
  return [...target, ...source];
};

export const placeCardOnTop = <S, R>([card, pile]: [
  PlayingCard<S, R> | undefined,
  Pile<S, R>
]) => {
  const insertionPile = card ? [card] : [];
  return placeOnTop([insertionPile, pile]);
};

export const placeCardOnBottom = <S, R>([card, pile]: [
  PlayingCard<S, R> | undefined,
  Pile<S, R>
]) => {
  const insertionPile = card ? [card] : [];
  return placeOnBottom([insertionPile, pile]);
};

export const insertAt = <S, R>(
  index: number,
  [source, target]: [Pile<S, R>, Pile<S, R>]
): Pile<S, R> => {
  return [
    ...target.slice(0, index),
    ...source,
    ...target.slice(index, target.length),
  ];
};

export const insertCardAt = <S, R>(
  index: number,
  card: PlayingCard<S, R> | undefined,
  pile: Pile<S, R>
): Pile<S, R> => {
  const insertionPile = card ? [card] : [];
  return insertAt(index, [insertionPile, pile]);
};
