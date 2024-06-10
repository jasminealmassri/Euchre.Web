import React from 'react'

import { gameInterface } from '../App';

interface props {
  game: gameInterface;
}




const ScoreComponent : React.FC<props> = ({ game }) => {
    let your_team_score = 0;
    let trump = "Spades";
    
    let tricks_won = 0;
    let tricks_lost = 0;

  return (
    <div className="scoreboard">
    <div className="scores">
      <div>Your team: { your_team_score } points</div>
      {/* <div>Your team: { prop.game.player1.score } points</div> */}
      <div>Enemy team: { your_team_score } points</div>
    </div>
    <div className="trump">
      <p>Current trump: { trump }</p>
    </div>
    <div className="tricks">
       <div>Tricks won: {tricks_won}</div>
      <div>Tricks lost: {tricks_lost}</div>
    </div>
  </div>
  )
}

export default ScoreComponent