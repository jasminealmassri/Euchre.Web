import React, {useContext} from 'react'

import { gameInterface } from '../App';

import './ScoreComponent.css'

import { GameContext } from '../App';

interface props {
  //game: gameInterface;
}




const ScoreComponent : React.FC<props> = () => {
  const [game, setGame] = useContext(GameContext);
    // let your_team_score = 0;
    // let their_team_score = 0;
    let trump = "Spades";
    
    let tricks_won = 0;
    let tricks_lost = 0;

  const changeScore = (num : number) => {
    game.updateGame(prevGame => {
      if (prevGame) {
        return {
          ...prevGame,
          player1: {...prevGame.player1, score: prevGame.player1.score + num}
        }
      }
    })
  }


  return (
    <>
      <div className="total_scores">
          <div>Your team:   { game.player1.score + game.player3.score } points</div>
          <div>Enemy team:  { game.player2.score + game.player4.score } points</div>
      </div>
      <div className="scoreboard">
        <div className="left_score">
          {/* <div>Your team: { prop.game.player1.score } points</div> */}
          <p>Tricks won: { tricks_won }</p>
        </div>
        <div className="middle_score">
          <p>Current trump: { trump }</p>
        </div>
        <div className="right_score">
          <p>Tricks lost: {tricks_lost}</p>
        </div>
      </div>
      <button onClick={() => changeScore(1)}>Change score</button>
    </>
  )
}

export default ScoreComponent