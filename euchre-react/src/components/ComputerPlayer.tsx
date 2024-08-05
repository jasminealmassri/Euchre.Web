import { useAppDispatch, useEuchreSelector } from "../state/hooks";
import {
  selectCanBid,
  selectCanCallTrump,
  selectCanDeal,
  selectCanPlay,
  selectLeadingPlayer,
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
import { Phase, PlayingCardSuit } from "../lib/euchre";
import PileViewer from "./Pile";
import TrumpSelector from "./TrumpSelector";
import { declare } from "../state/thunks/euchre";
import "./TableComponent.css";
import "./Player.css";
import { pickCardToPlay } from "../lib/computer-player";
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
  const leadingPlayer = useEuchreSelector(selectLeadingPlayer);
  const hand = useEuchreSelector(selectPile(player.hand));
  const phase = useEuchreSelector(selectPhase);
  const dealer = useEuchreSelector((state) => state.dealer);
  const leadingSuit = useEuchreSelector((state) => state.leadingSuit);

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

  useEffect(() => {
    if (canPlay) {
      const timeoutId = setTimeout(() => {
        handleCardClick(pickCardToPlay(hand, leadingSuit));
      }, 800);
      return () => clearTimeout(timeoutId);
    }
    // if (canDeal) {
    //   dispatch(startHand());
    // }
  }, [canPlay]);

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
      <ul>
        <li>
          Name: {player.name} {canPlay && "*"}
        </li>
        <li>
          Leading Player: {playerPointer === leadingPlayer ? "Yes" : "No"}
        </li>
        <li>Role: {player.role}</li>
        <li>Tricks: {player.tricks}</li>
        <li>Sitting Out: {player.sittingOut ? "Yes" : "No"}</li>
      </ul>
      <div>
        <div>
          <PileViewer
            onClick={handleCardClick}
            pile={hand}
            className={playerCSSClasses[player.tablePosition]}
          />
        </div>
        {/* Trial for how computer player can automatically advance state */}
        {/* {canPlay &&
          (() => {
            handleCardClick(pickCardToPlay(state, playerPointer));
            return null;
          })()} */}
        <div className={`player-${playerPointer + 1}-prompt`}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.25em" }}
          >
            {canBid && (
              <>
                <button onClick={() => dispatch(pass())}>Pass</button>
                <button onClick={() => dispatch(orderUp(playerPointer))}>
                  Order Up
                </button>
              </>
            )}
            {mustDeclare && (
              <>
                <button onClick={() => dispatch(declare("alone"))}>
                  Play Alone
                </button>
                <button onClick={() => dispatch(declare())}>
                  Play With Partner
                </button>
              </>
            )}
            {canDeal &&
              (() => {
                dispatch(startHand());
                return null;
              })()}
            {/* {canDeal && (
              <button onClick={() => dispatch(startHand())}>Deal</button>
            )} */}
            {canCallTrump && <TrumpSelector onClick={handleTrumpClick} />}
            {canCallTrump && !mustCallTrump && (
              <button onClick={() => dispatch(passOnTrump())}>Pass</button>
            )}
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
