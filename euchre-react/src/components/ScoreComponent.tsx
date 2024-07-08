import {useContext} from 'react'
import './ScoreComponent.css'
import { GameContext } from './EuchreComponent';


const ScoreComponent = () => {
  const game = useContext(GameContext);
  //let tricks_won = 0;
  //let tricks_lost = 0;

  // const changeScore = (num : number) => {
  //   game.updateGame(prevGame => {
  //     if (prevGame) {
  //       return {
  //         ...prevGame,
  //         player1: {...prevGame.player1, score: prevGame.player1.score + num}
  //       }
  //     }
  //   })
  // }


  return (
    <>
      <div className="total_scores">
          <div>Your team:   { game.player1.score + game.player3.score } points</div>
          <div>Enemy team:  { game.player2.score + game.player4.score } points</div>
      </div>
      <div className="scoreboard">
        <div className="left_score">
          <p>Tricks won: { game.tricks_won }</p>
        </div>
        <div className="middle_score">
          <p>Current trump: { game.trump }</p>
        </div>
        <div className="right_score">
          <p>Tricks lost: { game.tricks_lost } </p>
        </div>
      </div>
      {/* <button onClick={() => changeScore(1)}>Change score</button> */}
    </>
  )
}

export default ScoreComponent