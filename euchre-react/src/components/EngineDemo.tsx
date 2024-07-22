import { useEuchreSelector } from "../hooks";
import {
  selectDealer,
  selectPhase,
  selectPlayer,
  selectPlayers,
} from "../lib/euchre-slice";

import Player from "./Player";

const EngineDemo = () => {
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const dealerPointer = useEuchreSelector(selectDealer);
  const dealer = useEuchreSelector(selectPlayer(dealerPointer));

  return (
    <div>
      <ul>
        <li>Phase: {phase}</li>
        <li>Dealer: {dealer.name}</li>
      </ul>
      {players.map((player, i) => (
        <div key={player.name}>
          <Player playerPointer={i} />
        </div>
      ))}
    </div>
  );
};
export default EngineDemo;
