import {
  EuchreGameState,
  EuchreRank,
  EuchreSuit,
  getLeftBowerSuit,
} from "../euchre";
import {
  PlayingCard,
  PlayingCardRank,
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

export const pickCardToPlay = (state: EuchreGameState): number => {
  // TODO
  // note, this has to take in account cards that CAN be played
  return 0;
};
