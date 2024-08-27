import { Phase, PlayingCardSuit } from "../lib/euchre";
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
  declare,
  discard,
  orderUp,
  pass,
  passOnTrump,
  playCard,
  startHand,
} from "../state/thunks/euchre";
import PileViewer from "./Pile";
import TrumpSelector from "./TrumpSelector";
import "./Euchre.css";
import "./Player.css";
import "./CardComponent.css";
import { useEffect } from "react";

interface PlayerProps {
  playerPointer: number;
}

const HumanPlayer = ({ playerPointer }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const canBid = useEuchreSelector(selectCanBid(playerPointer));
  const canDeal = useEuchreSelector(selectCanDeal(playerPointer));
  const canPlay = useEuchreSelector(selectCanPlay(playerPointer));
  const canCallTrump = useEuchreSelector(selectCanCallTrump(playerPointer));
  const mustCallTrump = useEuchreSelector(selectMustCallTrump(playerPointer));
  const mustDeclare = useEuchreSelector(selectMustDeclare(playerPointer));
  const mustDiscard = useEuchreSelector(selectMustDiscard(playerPointer));
  const player = useEuchreSelector(selectPlayer(playerPointer));
  const hand = useEuchreSelector(selectPile(player.hand));
  const phase = useEuchreSelector(selectPhase);
  const dealer = useEuchreSelector((state) => state.dealer);

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

  const handlePlayClick = (index: number) => {
    if (!canPlay) {
      return;
    }

    dispatch(playCard(playerPointer, index));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (canDeal) {
        console.log(`player ${playerPointer + 1} can deal`);
        dispatch(startHand());
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [canDeal]);

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
            flippedUp={true}
            pile={hand}
            cardHoverEffect={canPlay ? true : false}
            className={playerCSSClasses[player.tablePosition]}
          />
        </div>

        <div className={`player-${playerPointer + 1}-prompt`}>
          {canBid && (
            <>
              <button className="prompt" onClick={() => dispatch(pass())}>
                Pass
              </button>
              <button
                className="prompt"
                onClick={() => dispatch(orderUp(playerPointer))}
              >
                Order Up
              </button>
            </>
          )}
          {mustDeclare && (
            <>
              <button
                className="prompt"
                onClick={() => dispatch(declare("alone"))}
              >
                Play Alone
              </button>
              <button className="prompt" onClick={() => dispatch(declare())}>
                Play With Partner
              </button>
            </>
          )}
          {canCallTrump && <TrumpSelector onClick={handleTrumpClick} />}
          {canCallTrump && !mustCallTrump && (
            <button className="prompt" onClick={() => dispatch(passOnTrump())}>
              Pass
            </button>
          )}
        </div>
      </div>
      {playerPointer === dealer && (
        <div className={`${dealerClasses[playerPointer]}`}>Dealer</div>
      )}
    </div>
  );
};
export default HumanPlayer;
