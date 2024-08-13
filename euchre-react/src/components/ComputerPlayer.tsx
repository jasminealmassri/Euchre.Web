import { useAppDispatch, useEuchreSelector } from "../state/hooks";
import {
  selectCanBid,
  selectCanCallTrump,
  selectCanDeal,
  selectCanPlay,
  selectMustCallTrump,
  selectMustDeclare,
  selectMustDiscard,
  selectPhase,
  selectPile,
  selectPlayer,
} from "../state/selectors/euchre";
import {
  callTrump,
  discard,
  orderUp,
  pass,
  passOnTrump,
  playCard,
  startHand,
} from "../state/thunks/euchre";
import { EuchreSuit, Phase, PlayingCardSuit } from "../lib/euchre";
import PileViewer from "./Pile";
import TrumpSelector from "./TrumpSelector";
import { declare } from "../state/thunks/euchre";
import "./TableComponent.css";
import "./Player.css";
import {
  pickCardToPlay,
  getCardsChanceWinning,
  decideToOrderItUp,
  getExpectedTricksWin,
  decideToGoAlone,
  pickCardToDiscard,
  pickSuitForTrump,
  forcedPickTrump,
  getCardsThatCanWin,
  pickThrowAwayCard,
  pickLeadingCard,
} from "../lib/computer-player";
import { useEffect } from "react";

interface PlayerProps {
  playerPointer: number;
}

const ComputerPlayer = ({ playerPointer }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const canBid = useEuchreSelector(selectCanBid(playerPointer));
  const canDeal = useEuchreSelector(selectCanDeal(playerPointer));
  const canPlay = useEuchreSelector(selectCanPlay(playerPointer));
  const canCallTrump = useEuchreSelector(selectCanCallTrump(playerPointer));
  const mustCallTrump = useEuchreSelector(selectMustCallTrump(playerPointer));
  const mustDeclare = useEuchreSelector(selectMustDeclare(playerPointer));
  const mustDiscard = useEuchreSelector(selectMustDiscard(playerPointer));
  const player = useEuchreSelector(selectPlayer(playerPointer));
  const trump = useEuchreSelector((state) => state.trump);
  const trick = useEuchreSelector((state) => state.piles.table);
  const talon = useEuchreSelector((state) => state.piles.talon);
  const hand = useEuchreSelector(selectPile(player.hand));
  const phase = useEuchreSelector(selectPhase);
  const dealer = useEuchreSelector((state) => state.dealer);
  const leadingSuit = useEuchreSelector((state) => state.leadingSuit);
  const trumpCandidates = useEuchreSelector((state) => state.trumpCandidates);

  const playerCSSClasses: string[] = [
    "player-1-hand",
    "player-2-hand",
    "player-3-hand",
    "player-4-hand",
  ];

  const dealerClasses: string[] = [
    "player_1_is_dealer",
    "player_2_is_dealer",
    "player_3_is_dealer",
    "player_4_is_dealer",
  ];

  const handleCardClick = (index: number) => {
    switch (phase) {
      case Phase.DISCARDING:
        handleDiscardClick(index);
        break;
      case Phase.PLAYING_TRICKS:
        handlePlayClick(index);
        break;
      default:
        break;
    }
  };

  const timeDelayMS: number = 1200;
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (canDeal) {
        console.log(`player ${playerPointer + 1} can deal`);
        dispatch(startHand());
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [canDeal]);

  useEffect(() => {
    if (canPlay) {
      if (trick.length === 0) {
        const leadingCardChosen = pickLeadingCard(
          hand,
          trump as PlayingCardSuit
        );
        console.log(
          "Leading mode: Leading card chosen is: ",
          JSON.stringify(hand[leadingCardChosen])
        );
      } else {
        const cardIndicesThatCanWin = getCardsThatCanWin(
          trick,
          hand,
          trump as PlayingCardSuit,
          leadingSuit as PlayingCardSuit
        );
        console.log("Cards that can win:");
        cardIndicesThatCanWin.forEach((index) =>
          console.log(JSON.stringify(hand[index]))
        );
        if (cardIndicesThatCanWin.length === 0) {
          const throwAwayIndex = pickThrowAwayCard(
            hand,
            trump as PlayingCardSuit,
            leadingSuit as PlayingCardSuit
          );
          console.log(
            "Throwaway mode, card chosen is: ",
            JSON.stringify(hand[throwAwayIndex])
          );
        }
      }
      const timeoutId = setTimeout(() => {
        handleCardClick(
          pickCardToPlay(trick.length, hand, trick, trump as EuchreSuit)
        );
      }, 1200);
      return () => clearTimeout(timeoutId);
    }
    // if (canDeal) {
    //   dispatch(startHand());
    // }
  }, [canPlay]);

  useEffect(() => {
    if (canBid) {
      hand.map((card) => {
        const cardChanceWinning = getCardsChanceWinning(
          card,
          hand,
          talon[0].suit
        );
        console.log(
          `[${card.suit}, ${card.rank}]'s chance of winning is ${cardChanceWinning}`
        );
      });

      console.log(
        "Number of expected tricks to win is: ",
        getExpectedTricksWin(hand, talon[0].suit)
      );
      const timeoutId = setTimeout(() => {
        decideToOrderItUp(hand, talon[0].suit)
          ? dispatch(orderUp(playerPointer)) // dispatch(orderUp(playerPointer))
          : dispatch(pass());
      }, timeDelayMS);
      return () => clearTimeout(timeoutId);
    }
  }, [canBid]);

  useEffect(() => {
    if (mustDeclare) {
      const timeoutId = setTimeout(() => {
        decideToGoAlone(hand, trump as PlayingCardSuit)
          ? dispatch(declare("alone"))
          : dispatch(declare());
      }, timeDelayMS);
      return () => clearTimeout(timeoutId);
    }
  }, [mustDeclare]);

  useEffect(() => {
    if (mustDiscard) {
      const timeoutId = setTimeout(() => {
        handleDiscardClick(pickCardToDiscard(hand, trump as PlayingCardSuit));
      }, timeDelayMS);
      return () => clearTimeout(timeoutId);
    }
  }, [mustDiscard]);

  useEffect(() => {
    if (canCallTrump) {
      const timeoutId = setTimeout(() => {
        if (mustCallTrump) {
          const forcedTrump = forcedPickTrump(hand, trumpCandidates);
          dispatch(callTrump(playerPointer, forcedTrump));
        } else {
          const chosenSuit = pickSuitForTrump(hand, trumpCandidates);
          chosenSuit
            ? dispatch(callTrump(playerPointer, chosenSuit))
            : dispatch(passOnTrump());
        }
      }, timeDelayMS);
      return () => clearTimeout(timeoutId);
    }
  });

  const handlePlayClick = (index: number) => {
    if (!canPlay) {
      return;
    }

    dispatch(playCard(playerPointer, index));
  };

  const handleDiscardClick = (index: number) => {
    if (!mustDiscard) {
      return;
    }

    if (index === 0) {
      return;
    }

    dispatch(discard(index, player.hand));
  };

  const handleTrumpClick = (trump: PlayingCardSuit) => {
    dispatch(callTrump(playerPointer, trump));
  };

  return (
    <div>
      <div>
        <div>
          <PileViewer
            onClick={handleCardClick}
            pile={hand}
            className={playerCSSClasses[player.tablePosition]}
          />
        </div>
        <div className={`player-${playerPointer + 1}-prompt`}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.25em" }}
          >
            {/* {canBid && (
              <>
                <button onClick={() => dispatch(pass())}>Pass</button>
                <button onClick={() => dispatch(orderUp(playerPointer))}>
                  Order Up
                </button>
              </>
            )} */}
            {/* {mustDeclare && (
              <>
                <button onClick={() => dispatch(declare())}>Play Alone</button>
                <button onClick={() => dispatch(declare())}>
                  Play With Partner
                </button>
              </>
            )} */}
            {/* {canCallTrump && <TrumpSelector onClick={handleTrumpClick} />}
            {canCallTrump && !mustCallTrump && (
              <button onClick={() => dispatch(passOnTrump())}>Pass</button>
            )} */}
          </div>
        </div>
      </div>
      {playerPointer === dealer && (
        <div className={`${dealerClasses[playerPointer]}`}>Dealer</div>
      )}
    </div>
  );
};
export default ComputerPlayer;
