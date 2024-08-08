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

export const getCardsChanceWinning = (state: EuchreGameState): number => {
  // TODO
  return Math.random();
};

export const getExpectedTricksWin = (state: EuchreGameState): number => {
  // TODO
  return Math.floor(Math.random() * 6);
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
