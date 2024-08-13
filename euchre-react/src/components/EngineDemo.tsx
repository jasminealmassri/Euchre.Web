import React from "react";

import { useEuchreSelector } from "../state/hooks";
import {
  findPlayer,
  selectCurrentPlayer,
  selectDealerPointer,
  selectPhase,
  selectPlayers,
  selectTrumpMaker,
  selectTrumpMakerIndex,
} from "../state/selectors/euchre";
import Pile from "./Pile";
import HumanPlayer from "./HumanPlayer";
import "./TableComponent.css";
import ScoreComponent from "./ScoreComponent";
import MessageComponent from "./MessageComponent";
import ComputerPlayer from "./ComputerPlayer";
import { EuchrePlayerState, Phase } from "../state";
import { gamePhase } from "../interfaces/gamePhase";

const EngineDemo = () => {
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const currentPlayer = useEuchreSelector(selectCurrentPlayer);
  const dealerPointer = useEuchreSelector(selectDealerPointer);
  const dealer = useEuchreSelector(findPlayer(dealerPointer));
  const trumpMaker = useEuchreSelector(selectTrumpMaker) as EuchrePlayerState;
  const trumpMakerIndex = useEuchreSelector(selectTrumpMakerIndex);
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
      <div>
        <ScoreComponent />
        {/* <MessageComponent /> */}
        {/* <PromptComponent/> */}
        <p
          className={currentPlayer === 0 ? "currentPlayer" : ""}
          id="player-1-label"
        >
          {players[0].name}
        </p>
        <p
          className={currentPlayer === 1 ? "currentPlayer" : ""}
          id="player-2-label"
        >
          {players[1].name}
        </p>
        <p
          className={currentPlayer === 2 ? "currentPlayer" : ""}
          id="player-3-label"
        >
          {players[2].name}
        </p>
        <p
          className={currentPlayer === 3 ? "currentPlayer" : ""}
          id="player-4-label"
        >
          {players[3].name}
        </p>
        {/* <TableComponent /> */}
      </div>
      <div>
        {/* <ul>
          <li>Phase: {phase}</li>
          <li>Dealer: {dealer?.name}</li>
          <li>Trump: {trump}</li>
          <li>Leading Suit: {leadingSuit}</li>
          <li>Team 1 Score: {team1Score}</li>
          <li>Team 2 Score: {team2Score}</li>
          <li>Leading player: {leadingPlayer + 1}</li>
          <li>
            {"Table Positions playing in order: [ "}
            {tablePositionsPlaying.map(
              (number, index) =>
                `${number + 1} ${
                  index !== tablePositionsPlaying.length - 1 ? "," : ""
                } `
            )}
            {" ]"}
          </li>
        </ul> */}
        <div className={"trick"}>
          {talon.length > 0 && (
            <Pile
              pile={talon}
              flippedUp={true}
              className={`player-${dealerPointer + 1}-card`}
            />
          )}
          {table.length > 0 && (
            <Pile
              flippedUp={true}
              showHighestCard={true}
              pile={table}
              isTablePile={true}
            />
          )}
        </div>
        {players.map((player, i) => (
          <React.Fragment key={player.name}>
            <div>
              {player.type === "human" ? (
                <HumanPlayer playerPointer={i} />
              ) : (
                <ComputerPlayer playerPointer={i} />
              )}
            </div>
            {/* <hr /> */}
            {phase === Phase.END_OF_GAME && (
              <button className="startNewGame">Start New Game?</button>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default EngineDemo;
