import React from "react";

import { useAppDispatch, useEuchreSelector } from "../state/hooks";
import {
  selectCurrentPlayer,
  selectDealerPointer,
  selectPhase,
  selectPlayers,
} from "../state/selectors/euchre";
import Pile from "./Pile";
import HumanPlayer from "./HumanPlayer";
import "./Euchre.css";
import ScoreComponent from "./ScoreComponent";
import ComputerPlayer from "./ComputerPlayer";
import { Phase } from "../state";
import { resetState } from "../state/reducers/euchre";

const Euchre = () => {
  const dispatch = useAppDispatch();
  const phase = useEuchreSelector(selectPhase);
  const players = useEuchreSelector(selectPlayers);
  const currentPlayer = useEuchreSelector(selectCurrentPlayer);
  const dealerPointer = useEuchreSelector(selectDealerPointer);
  const talon = useEuchreSelector((state) => state.piles.talon);
  const table = useEuchreSelector((state) => state.piles.table);
  const team1Score = useEuchreSelector((state) => state.team1Score);
  const team2Score = useEuchreSelector((state) => state.team2Score);
  return (
    <>
      <div>
        <ScoreComponent />
        {players.map(
          (player, i) =>
            !player.sittingOut && (
              <p
                className={currentPlayer === i ? "currentPlayer" : ""}
                id={`player-${i + 1}-label`}
              >
                {player.name}
              </p>
            )
        )}
      </div>
      <div>
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
        {phase === Phase.END_OF_GAME && team1Score >= 10 && (
          <div className="endgame winner">You won! 😀</div>
        )}
        {phase === Phase.END_OF_GAME && team2Score >= 10 && (
          <div className="endgame loser">You lost 😞</div>
        )}
        {phase === Phase.END_OF_GAME && (
          <button
            className="startNewGame"
            onClick={() => {
              dispatch(resetState());
            }}
          >
            Start New Game
          </button>
        )}
        {players.map((player, i) => (
          <React.Fragment key={player.name}>
            <div>
              {player.type === "human" ? (
                <HumanPlayer playerPointer={i} />
              ) : (
                <ComputerPlayer playerPointer={i} />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default Euchre;
