import { useAppDispatch, useEuchreSelector } from "../hooks";
import {
  orderUp,
  pass,
  selectCanBid,
  selectCanDeal,
  selectMustDiscard,
  selectPile,
  selectPlayer,
  startHand,
} from "../lib/euchre-slice";

interface PlayerProps {
  playerPointer: number;
}

const Player = ({ playerPointer }: PlayerProps) => {
  const dispatch = useAppDispatch();
  const canBid = useEuchreSelector(selectCanBid(playerPointer));
  const canDeal = useEuchreSelector(selectCanDeal(playerPointer));
  const mustDiscard = useEuchreSelector(selectMustDiscard(playerPointer));
  const player = useEuchreSelector(selectPlayer(playerPointer));
  const hand = useEuchreSelector(selectPile(player.hand));

  return (
    <div>
      <ul>
        <li>Name: {player.name}</li>
        <li>Tricks: {player.tricks}</li>
        <li>Hand Size: {hand.length}</li>
      </ul>
      <div>
        {canBid && (
          <>
            <button onClick={() => dispatch(pass())}>Pass</button>
            <button onClick={() => dispatch(orderUp())}>Order Up</button>
          </>
        )}

        {canDeal && <button onClick={() => dispatch(startHand())}>Deal</button>}
        {mustDiscard && <button>Discard</button>}
      </div>
    </div>
  );
};
export default Player;
