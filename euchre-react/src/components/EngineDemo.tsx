import React from "react";
import { useEuchreSelector } from "../hooks";
import {
  selectDealer,
  selectPhase,
  selectPlayer,
  selectPlayers,
} from "../lib/euchre-slice";
import Card from "./Card";

import Player from "./Player";

const EngineDemo = () => {
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const dealerPointer = useEuchreSelector(selectDealer);
  const dealer = useEuchreSelector(selectPlayer(dealerPointer));
  const talon = useEuchreSelector((state) => state.piles.talon);
  const trump = useEuchreSelector((state) => state.trump);

  return (
    <div>
      <ul>
        <li>Phase: {phase}</li>
        <li>Dealer: {dealer.name}</li>
        <li>Trump: {trump}</li>
      </ul>
      {talon.length > 0 && (
        <Card suit={talon[0].suit} rank={talon[0].rank} index={0} />
      )}
      {players.map((player, i) => (
        <React.Fragment key={player.name}>
          <div>
            <Player playerPointer={i} />
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};
export default EngineDemo;
