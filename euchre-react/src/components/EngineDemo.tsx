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
import "./TableComponent.css";
import ScoreComponent from "./ScoreComponent";
import TableComponent from "./TableComponent";

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
  const leadingPlayer = useEuchreSelector((state) => state.leadingPlayer);
  const tablePositionsPlaying = useEuchreSelector(
    (state) => state.tablePositionsPlaying
  );
  return (
    <>
      <div className="game">
        <ScoreComponent />
        <TableComponent />
      </div>
      <div>
        <ul>
          <li>Phase: {phase}</li>
          <li>Dealer: {dealer?.name}</li>
          <li>Trump: {trump}</li>
          <li>Leading Suit: {leadingSuit}</li>
          <li>Team 1 Score: {team1Score}</li>
          <li>Team 2 Score: {team2Score}</li>
          <li>Leading player: {leadingPlayer + 1}</li>
          <li>
            {" "}
            Table Positions playing in order:
            {tablePositionsPlaying.map((number) => (
              <li>{number + 1}</li>
            ))}
          </li>
        </ul>
        <div className={"trick"}>
          {talon.length > 0 && (
            <Pile pile={talon} className={`player-${dealerPointer + 1}-card`} />
          )}
          {table.length > 0 && (
            <Pile showHighestCard={true} pile={table} isTablePile={true} />
          )}
        </div>
        {players.map((player, i) => (
          <React.Fragment key={player.name}>
            <div>
              <Player playerPointer={i} />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default EngineDemo;
