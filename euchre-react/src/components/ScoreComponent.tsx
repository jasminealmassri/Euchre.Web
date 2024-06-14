import React from 'react'

import { gameInterface } from '../App';

import './ScoreComponent.css'

interface props {
  game: gameInterface;
}




const ScoreComponent : React.FC<props> = ({ game }) => {
    let your_team_score = 0;
    let their_team_score = 0;
    let trump = "Spades";
    
    let tricks_won = 0;
    let tricks_lost = 0;

  return (
    <>
      <div className="total_scores">
          <div>Your team: { your_team_score } points</div>
          <div>Enemy team: { their_team_score }</div>
      </div>
      <div className="scoreboard">
        <div className="left_score">
          {/* <div>Your team: { prop.game.player1.score } points</div> */}
          <p>Tricks won: { tricks_won } points</p>
        </div>
        <div className="middle_score">
          <p>Current trump: { trump }</p>
        </div>
        <div className="right_score">
          <p>Tricks lost: {tricks_lost}</p>
        </div>
      </div>
    </>
  )
}

export default ScoreComponent