import { useAppDispatch, useEuchreSelector } from "../hooks";
import {
  callTrump,
  discard,
  orderUp,
  pass,
  passOnTrump,
  selectCanBid,
  selectCanCallTrump,
  selectCanDeal,
  selectCanPlay,
  selectMustCallTrump,
  selectMustDiscard,
  selectPile,
  selectPlayer,
  startHand,
} from "../lib/euchre-slice";
import { PlayingCardSuit } from "../lib/playing-card.interface";
import Card from "./Card";
import TrumpSelector from "./TrumpSelector";

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
  const mustDiscard = useEuchreSelector(selectMustDiscard(playerPointer));
  const player = useEuchreSelector(selectPlayer(playerPointer));
  const hand = useEuchreSelector(selectPile(player.hand));

  const handleCardClick = (index: number) => {
    // can't discard index 0 while discarding because that
    // was the talon card
    if (!mustDiscard) {
      return;
    }

    if (index === 0) {
      return;
    }

    dispatch(discard(index, player.hand));
  };

  const handleTrumpClick = (trump: PlayingCardSuit) => {
    dispatch(callTrump(trump));
  };

  return (
    <div>
      <ul>
        <li>
          Name: {player.name} {canPlay && "*"}
        </li>
        <li>Tricks: {player.tricks}</li>
      </ul>
      <div>
        <div style={{ display: "flex", gap: "0.25em" }}>
          {hand.map((card, i) => (
            <Card
              key={i}
              suit={card.suit}
              rank={card.rank}
              index={i}
              onClick={handleCardClick}
            />
          ))}
        </div>
        {canBid && (
          <>
            <button onClick={() => dispatch(pass())}>Pass</button>
            <button onClick={() => dispatch(orderUp())}>Order Up</button>
          </>
        )}

        {canDeal && <button onClick={() => dispatch(startHand())}>Deal</button>}
        {mustDiscard && <button>Discard</button>}
        {canCallTrump && <TrumpSelector onClick={handleTrumpClick} />}
        {canCallTrump && !mustCallTrump && (
          <button onClick={() => dispatch(passOnTrump())}>Pass</button>
        )}
      </div>
    </div>
  );
};
export default Player;
