import React from "react";

import { useEuchreSelector } from "../hooks";
import {
  selectDealer,
  selectPhase,
  selectPlayer,
  selectPlayers,
  selectTeamScores,
} from "../lib/euchre-slice";
import Pile from "./Pile";
import Player from "./Player";

const EngineDemo = () => {
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const dealerPointer = useEuchreSelector(selectDealer);
  const dealer = useEuchreSelector(selectPlayer(dealerPointer));
  const talon = useEuchreSelector((state) => state.piles.talon);
  const table = useEuchreSelector((state) => state.piles.table);
  const trump = useEuchreSelector((state) => state.trump);
  const leadingSuit = useEuchreSelector((state) => state.leadingSuit);
  const teamScores = useEuchreSelector(selectTeamScores);

  return (
    <div>
      <ul>
        <li>Phase: {phase}</li>
        <li>Dealer: {dealer.name}</li>
        <li>Trump: {trump}</li>
        <li>Leading Suit: {leadingSuit}</li>
        <li>Team 1 Score: {teamScores[0]}</li>
        <li>Team 2 Score: {teamScores[1]}</li>
      </ul>
      {talon.length > 0 && <Pile pile={talon} />}
      {table.length > 0 && <Pile showHighestCard={true} pile={table} />}
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
