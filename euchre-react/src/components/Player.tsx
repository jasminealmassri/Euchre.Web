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
import { Phase, PlayingCardSuit } from "../lib/euchre";
import PileViewer from "./Pile";
import TrumpSelector from "./TrumpSelector";
import { declare } from "../state/thunks/euchre";
import './TableComponent.css';

interface PlayerProps {
  playerPointer: number;
}

const Player = ({ playerPointer }: PlayerProps) => {
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

  const playerCSSClasses : string[] = ['player-1-hand', 'player-2-hand', 'player-3-hand', 'player-4-hand'];

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
        <li>Role: {player.role}</li>
        <li>Tricks: {player.tricks}</li>
      </ul>
      <div>
        <div style={{ display: "flex", gap: "0.25em" }}>
          <PileViewer onClick={handleCardClick} pile={hand} className={playerCSSClasses[player.tablePosition]} />
        </div>
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
        {canDeal && <button onClick={() => dispatch(startHand())}>Deal</button>}
        {canCallTrump && <TrumpSelector onClick={handleTrumpClick} />}
        {canCallTrump && !mustCallTrump && (
          <button onClick={() => dispatch(passOnTrump())}>Pass</button>
        )}
      </div>
    </div>
  );
};
export default Player;
