import React from "react";

import { useEuchreSelector } from "../state/hooks";
import {
  findPlayer,
  selectDealerPointer,
  selectPhase,
  selectPlayers,
} from "../state/selectors/euchre";
import Pile from "./Pile";
import Player from "./Player";
import './TableComponent.css';

const EngineDemo = () => {
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const dealerPointer = useEuchreSelector(selectDealerPointer);
  const dealer = useEuchreSelector(findPlayer(dealerPointer));
  const talon = useEuchreSelector((state) => state.piles.talon);
  const table = useEuchreSelector((state) => state.piles.table);
  const trump = useEuchreSelector((state) => state.trump);
  const leadingSuit = useEuchreSelector((state) => state.leadingSuit);
  const team1Score = useEuchreSelector((state) => state.team1Score);
  const team2Score = useEuchreSelector((state) => state.team2Score);

  const playerClasses = ['player-1-hand', 'player-2-hand', 'player-3-hand', 'player-4-hand'];
  
  return (
    <div>
      <ul>
        <li>Phase: {phase}</li>
        <li>Dealer: {dealer?.name}</li>
        <li>Trump: {trump}</li>
        <li>Leading Suit: {leadingSuit}</li>
        <li>Team 1 Score: {team1Score}</li>
        <li>Team 2 Score: {team2Score}</li>
      </ul>
        <p id="player-1-label">You</p>
        <p id="player-2-label">Player 2</p>
        <p id="player-3-label">Player 3</p>
        <p id="player-4-label">Player 4</p>
      {talon.length > 0 && <Pile pile={talon} />}
      {table.length > 0 && <Pile showHighestCard={true} pile={table} />}
      {players.map((player, i) => (
        <React.Fragment key={player.name}>
          <div>
            <Player playerPointer={i} className={playerClasses[i]} />
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};
export default EngineDemo;
