import { selectPlayerHand, selectSuit } from "../../state/selectors/euchre";
import {
  EuchreGameState,
  EuchreRank,
  EuchreSuit,
  getLeftBowerSuit,
  isLeftBower,
} from "../euchre";
import {
  Pile,
  PlayingCard,
  PlayingCardRank,
  PlayingCardSuit,
} from "../playing-card/playing-card.interface";

export const sameCard = (
  card1: PlayingCard<EuchreSuit, EuchreRank>,
  card2: PlayingCard<EuchreSuit, EuchreRank>
) => {
  return card1.suit === card2.suit && card1.rank === card2.rank;
};

export const getCardsRankList = (
  trump: EuchreSuit,
  leadingSuit: EuchreSuit
): PlayingCard<EuchreSuit, EuchreRank>[] => {
  return [
    {
      suit: trump,
      rank: PlayingCardRank.JACK,
    },
    {
      suit: getLeftBowerSuit(trump),
      rank: PlayingCardRank.JACK,
    },
    {
      suit: trump,
      rank: PlayingCardRank.ACE,
    },
    {
      suit: trump,
      rank: PlayingCardRank.KING,
    },
    {
      suit: trump,
      rank: PlayingCardRank.QUEEN,
    },
    {
      suit: trump,
      rank: PlayingCardRank.TEN,
    },
    {
      suit: trump,
      rank: PlayingCardRank.NINE,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.ACE,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.KING,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.QUEEN,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.JACK,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.TEN,
    },
    {
      suit: leadingSuit,
      rank: PlayingCardRank.NINE,
    },
  ];
};

export const getCardsChanceWinning = (
  card: PlayingCard<PlayingCardSuit, EuchreRank>,
  hand: Pile<PlayingCardSuit, EuchreRank>,
  proposedTrump: PlayingCardSuit
): number => {
  const ranksList = getCardsRankList(proposedTrump, card.suit);
  // remove cards that already exist in the hand

  const restOfHand = hand.filter((handCard) => !sameCard(card, handCard));
  const filteredRanksList = ranksList.filter(
    (rankCard) => !restOfHand.some((handCard) => sameCard(rankCard, handCard))
  );
  const cardRank = filteredRanksList.findIndex((rankCard) =>
    sameCard(rankCard, card)
  );
  // hand: console.log("ranksList:", ranksList);
  // console.log("filteredRanksList:", filteredRanksList);
  // console.log("cardIndex:", cardRank);
  return (ranksList.length - 1 - cardRank) / (ranksList.length - 1);
};

export const getExpectedTricksWin = (
  hand: Pile<PlayingCardSuit, EuchreRank>,
  proposedTrump: PlayingCardSuit
): number => {
  return hand.reduce((accumulator, card) => {
    return (
      accumulator +
      (getCardsChanceWinning(card, hand, proposedTrump) >= 0.5 ? 1 : 0)
    );
  }, 0);
};

export const decideToOrderItUp = (
  hand: Pile<PlayingCardSuit, EuchreRank>,
  proposedTrump: PlayingCardSuit
): boolean => {
  return getExpectedTricksWin(hand, proposedTrump) >= 3;
};

export const getHighestSuitsChanceWin = (
  state: EuchreGameState
): EuchreSuit => {
  // TODO
  return state.trumpCandidates[Math.random() * state.trumpCandidates.length];
};

export const pickCardToPlay = (
  hand: Pile<PlayingCardSuit, EuchreRank>,
  leadingSuit: EuchreSuit | null,
  trumpSuit: EuchreSuit
): number => {
  // TODO
  const copyHand: Pile<PlayingCardSuit, EuchreRank> = [...hand];
  const updatedHand = copyHand.map((card) =>
    isLeftBower(card, trumpSuit) ? { ...card, suit: trumpSuit } : card
  );
  const hasLeadingSuit = updatedHand.findIndex(
    (card) => card.suit === leadingSuit
  );

  if (hasLeadingSuit !== -1) {
    return hasLeadingSuit;
  } else {
    return 0;
  }
};
