import { sortPile } from "../../state/reducers/euchre";
import { selectPlayerHand, selectSuit } from "../../state/selectors/euchre";
import {
  EuchreGameState,
  EuchreRank,
  EuchreSuit,
  getHighestCard,
  getLeftBowerSuit,
  getSortedPile,
  isLeftBower,
} from "../euchre";
import {
  Pile,
  PlayingCard,
  PlayingCardRank,
  EuchreSuit,
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
  card: PlayingCard<EuchreSuit, EuchreRank>,
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): number => {
  const ranksList = getCardsRankList(proposedTrump, card.suit);

  const restOfHand = hand.filter((handCard) => !sameCard(card, handCard));
  // remove cards that already exist in the hand
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
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): number => {
  return hand.reduce((accumulator, card) => {
    return (
      accumulator +
      (getCardsChanceWinning(card, hand, proposedTrump) > 0.5 ? 1 : 0)
    );
  }, 0);
};

export const getHandsTotalWinningPower = (
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): number => {
  return hand.reduce((accumulator, card) => {
    return accumulator + getCardsChanceWinning(card, hand, proposedTrump);
  }, 0);
};

export const decideToOrderItUp = (
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): boolean => {
  return getExpectedTricksWin(hand, proposedTrump) >= 3;
};

export const decideToGoAlone = (
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): boolean => {
  return getExpectedTricksWin(hand, proposedTrump) >= 4;
};

export const pickCardToDiscard = (
  hand: Pile<EuchreSuit, EuchreRank>,
  trump: EuchreSuit
): number => {
  const cardsChancesWinningArray = hand.map((card) =>
    getCardsChanceWinning(card, hand, trump)
  );
  let lowestChanceWinning = cardsChancesWinningArray[1];
  let lowestIndex = 1;
  for (let i = 1; i < cardsChancesWinningArray.length; i++) {
    if (cardsChancesWinningArray[i] < lowestChanceWinning) {
      lowestChanceWinning = cardsChancesWinningArray[i];
      lowestIndex = i;
    }
  }
  return lowestIndex;
};

export const pickSuitForTrump = (
  hand: Pile<EuchreSuit, EuchreRank>,
  trumpCandidates: Array<EuchreSuit>
): EuchreSuit | null => {
  let highestWinPower = 0.0;
  let highestSuit = trumpCandidates[0];
  for (let i = 0; i < trumpCandidates.length; i++) {
    let handsWinningPower = getHandsTotalWinningPower(hand, trumpCandidates[i]);
    if (handsWinningPower > highestWinPower) {
      highestWinPower = handsWinningPower;
      highestSuit = trumpCandidates[i];
    }
  }
  return highestWinPower > 3 ? highestSuit : null;
};

export const forcedPickTrump = (
  hand: Pile<EuchreSuit, EuchreRank>,
  trumpCandidates: Array<EuchreSuit>
): EuchreSuit => {
  let highestWinPower = 0.0;
  let highestSuit = trumpCandidates[0];
  for (let i = 0; i < trumpCandidates.length; i++) {
    let handsWinningPower = getHandsTotalWinningPower(hand, trumpCandidates[i]);
    if (handsWinningPower > highestWinPower) {
      highestWinPower = handsWinningPower;
      highestSuit = trumpCandidates[i];
    }
  }
  return highestSuit;
};

// this function is for when a leading suit has already been chosen (trick.length > 0)
export const getCardsThatCanWin = (
  trick: Pile<EuchreSuit, EuchreRank>,
  hand: Pile<EuchreSuit, EuchreRank>,
  trump: EuchreSuit,
  leadingSuit: EuchreSuit
): number[] => {
  let cardsThatCanWin: PlayingCard<EuchreSuit, EuchreRank>[] = [];
  let cardsIndicesThatCanwin: number[] = [];

  // check if this is working
  // let copyHand = hand.map((card) => {
  //   return isLeftBower(card, trump) ? { ...card, suit: trump } : card;
  // });
  let playableCards: Pile<EuchreSuit, EuchreRank> = hand;
  //console.log("copy hand after left bower evaluation is ", copyHand);

  // filter it out to only cards that can be played, if leading suit exists in the hand
  if (
    hand.find(
      (card) =>
        card.suit === leadingSuit ||
        (leadingSuit === trump && isLeftBower(card, trump))
    )
  ) {
    playableCards = hand.filter(
      (card) =>
        card.suit === leadingSuit ||
        (leadingSuit === trump && isLeftBower(card, trump))
    );
  }
  console.log("playable cards afer filtering is, ", playableCards);

  // get overall ranks list
  const ranksList = getCardsRankList(trump, leadingSuit);

  // get rank of highest card
  const highestCardIndex = getHighestCard(trick, trump, leadingSuit);
  let rankOfCardToBeat = ranksList.length - 1; // last index to start

  // get the highest rank of the current trick
  for (let i = 0; i < ranksList.length; i++) {
    if (sameCard(trick[highestCardIndex], ranksList[i])) {
      rankOfCardToBeat = i;
      break;
    }
  }

  // push cards that can win to the cards that can win
  for (let i = 0; i < ranksList.length; i++) {
    for (let j = 0; j < playableCards.length; j++) {
      if (sameCard(ranksList[i], playableCards[j])) {
        if (i < rankOfCardToBeat) {
          cardsThatCanWin.push(playableCards[j]);
        }
      }
    }
  }
  // get the indices of the cards that can win from the copyHand
  for (let i = 0; i < cardsThatCanWin.length; i++) {
    for (let j = 0; j < hand.length; j++) {
      if (sameCard(cardsThatCanWin[i], hand[j])) {
        cardsIndicesThatCanwin.push(j);
      }
    }
  }
  // give back the indices of the cards that can be played and win, these are ordered highest to lowest rank
  return cardsIndicesThatCanwin;
};

// returns the index of the chosen card to get rid of
export const pickThrowAwayCard = (
  hand: Pile<EuchreSuit, EuchreRank>,
  trump: EuchreSuit,
  leadingSuit: EuchreSuit
): number => {
  let playableCards: Pile<EuchreSuit, EuchreRank> = hand;
  if (
    hand.find(
      (card) =>
        card.suit === leadingSuit ||
        (leadingSuit === trump && isLeftBower(card, trump))
    )
  ) {
    playableCards = hand.filter(
      (card) =>
        card.suit === leadingSuit ||
        (leadingSuit === trump && isLeftBower(card, trump))
    );
  }

  const sortedPlayableCards = getSortedPile(playableCards, trump, leadingSuit);
  let lowestCardIndex = 0;
  hand.forEach((card, index) => {
    if (sameCard(card, sortedPlayableCards[sortedPlayableCards.length - 1])) {
      lowestCardIndex = index;
    }
  });

  return lowestCardIndex;
};

export const pickCardToPlay = (
  hand: Pile<EuchreSuit, EuchreRank>,
  leadingSuit: EuchreSuit | null,
  trumpSuit: EuchreSuit
): number => {
  // TODO
  const copyHand: Pile<EuchreSuit, EuchreRank> = [...hand];
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
