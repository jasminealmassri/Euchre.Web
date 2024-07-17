import {useContext} from 'react'
import './ScoreComponent.css'
import { GameContext } from './EuchreComponent';

import Clubs from '../assets/images/Suits/Outline/Clubs2.png'
import Spades from '../assets/images/Suits/Outline/Spades2.png'
import Hearts from '../assets/images/Suits/Outline/Hearts2.png'
import Diamonds from '../assets/images/Suits/Outline/Diamonds2.png'

import { Suit } from '../models/Suit';

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
  const getTrumpIcon = (trump : Suit | undefined) => {
    switch (trump) {
      case Suit.Clubs: 
        return Clubs; 
      case Suit.Hearts: 
        return Hearts; 
      case Suit.Diamonds: 
        return Diamonds; 
      case Suit.Spades: 
        return Spades; 
    }

  }
 


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
          <p>Current trump:</p><img src={getTrumpIcon(game.trump)}></img>
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