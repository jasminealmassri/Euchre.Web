import {
  EuchreRank,
  EuchreSuit,
  getHighestCard,
  getLeftBowerSuit,
  getPartnerIndex,
  getSuit,
  isLeftBower,
  isRightBower,
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
  return (ranksList.length - 1 - cardRank) / (ranksList.length - 1);
};

export const getExpectedTricksWin = (
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): number => {
  return hand.reduce((accumulator, card) => {
    return (
      accumulator +
      (getCardsChanceWinning(card, hand, proposedTrump) > 0.6 ? 1 : 0)
    );
  }, 0);
};

export const getExpectedTricksWinAlone = (
  hand: Pile<EuchreSuit, EuchreRank>,
  proposedTrump: EuchreSuit
): number => {
  return hand.reduce((accumulator, card) => {
    return (
      accumulator +
      (getCardsChanceWinning(card, hand, proposedTrump) > 0.75 ? 1 : 0)
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
  return getExpectedTricksWinAlone(hand, proposedTrump) >= 4;
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
  let playableCards: Pile<EuchreSuit, EuchreRank> = hand;

  // filter it out to only cards that can be played, if leading suit exists in the hand
  if (hand.find((card) => getSuit(card, trump) === leadingSuit)) {
    playableCards = hand.filter((card) => getSuit(card, trump) === leadingSuit);
  }
  //console.log("playable cards afer filtering is, ", playableCards);

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

  let lowestCardPlayableIndex = 0;
  let lowestChanceWin = 1.0;
  playableCards.forEach((card, index) => {
    const cardsChanceWin = getCardsChanceWinning(card, hand, trump);
    //console.log(`${JSON.stringify(card)}'s chance win is ${cardsChanceWin}`);
    if (cardsChanceWin < lowestChanceWin) {
      lowestChanceWin = cardsChanceWin;
      lowestCardPlayableIndex = index;
    }
  });

  let lowestCardHandIndex = 0.0;
  // get the indices of the cards that can win from the copyHand
  hand.forEach((_card, index) => {
    if (sameCard(playableCards[lowestCardPlayableIndex], hand[index])) {
      lowestCardHandIndex = index;
    }
  });

  return lowestCardHandIndex;
};

export const pickLeadingCard = (
  hand: Pile<EuchreSuit, EuchreRank>,
  trump: EuchreSuit
): number => {
  let chosenIndex = 0;
  if (hand.some((card) => isRightBower(card, trump))) {
    hand.forEach((card, index) => {
      if (isRightBower(card, trump)) {
        chosenIndex = index;
      }
    });
  } else if (
    hand.some(
      (card) => card.suit !== trump && card.rank === PlayingCardRank.ACE
    )
  ) {
    hand.forEach((card, index) => {
      if (card.suit !== trump && card.rank === PlayingCardRank.ACE) {
        chosenIndex = index;
      }
    });
  } else if (hand.some((card) => isLeftBower(card, trump))) {
    chosenIndex = hand.findIndex((card) => isLeftBower(card, trump));
  } else if (
    hand.some(
      (card) => card.suit !== trump && card.rank === PlayingCardRank.KING
    )
  ) {
    hand.forEach((card, index) => {
      if (card.suit !== trump && card.rank === PlayingCardRank.KING) {
        chosenIndex = index;
      }
    });
  } else {
    const nonTrumpHand = hand.filter(
      (card) => card.suit !== trump || !isLeftBower(card, trump)
    );
    let highestChanceWin = 0.0;
    nonTrumpHand.forEach((card, index) => {
      const cardsChanceWin = getCardsChanceWinning(card, hand, trump);
      if (cardsChanceWin > highestChanceWin) {
        highestChanceWin = cardsChanceWin;
        chosenIndex = index;
      }
    });
  }

  // placeholder
  return chosenIndex;
};

export const pickCardToPlay = (
  currentTrickPosition: number,
  partnerSittingOut: boolean,
  hand: Pile<EuchreSuit, EuchreRank>,
  trick: Pile<EuchreSuit, EuchreRank>,
  trump: EuchreSuit
): number => {
  let chosenCardIndex = 0;

  if (trick.length === 0) {
    chosenCardIndex = pickLeadingCard(hand, trump);
  } else {
    const leadingSuit = getSuit(trick[0], trump);
    const cardsThatCanWin = getCardsThatCanWin(
      trick,
      hand,
      trump,
      leadingSuit as PlayingCardSuit
    );
    if (cardsThatCanWin.length === 0) {
      chosenCardIndex = pickThrowAwayCard(
        hand,
        trump,
        leadingSuit as PlayingCardSuit
      );
    } else {
      if (trick.length >= 2) {
        const partnerPointer = getPartnerIndex(currentTrickPosition);
        // console.log(
        //   `Current trick position is ${currentTrickPosition}, and their's partner's trick position is ${partnerPointer}`
        // );
        if (
          !partnerSittingOut &&
          partnerPointer ===
            getHighestCard(trick, trump, leadingSuit as PlayingCardSuit)
        ) {
          chosenCardIndex = pickThrowAwayCard(
            hand,
            trump,
            leadingSuit as PlayingCardSuit
          );
        } else {
          chosenCardIndex = cardsThatCanWin[cardsThatCanWin.length - 1];
        }
      } else {
        chosenCardIndex = cardsThatCanWin[cardsThatCanWin.length - 1];
      }
    }
  }
  return chosenCardIndex;
};
