import {  useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { DeckFactory } from './models/DeckFactory';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';
import { Trick } from './models/Trick';

// import HandComponent from './components/HandComponent'
// import CardComponent from './components/CardComponent'

import TableComponent from './components/TableComponent'

import ScoreComponent from './components/ScoreComponent'

export interface gameInterface {
  // players 1-4
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
  trick : Trick;
  deck: Deck;
  // This is a function pointer
  updateGame: React.Dispatch<React.SetStateAction<gameInterface>>;

}

interface Player {
  // pointers to the use State variables that get updated
  score: number;
  hand: Hand;
}


function App() {
  const [game, setGame] = useState<gameInterface | null>(null);

  useEffect(() => {
    let newGame : gameInterface = {
      player1: {score: 0, hand : new Hand() },
      player2: {score: 0, hand : new Hand() },
      player3: {score: 0, hand : new Hand() },
      player4: {score: 0, hand : new Hand() },
      trick: {cards: []},
      deck: new Deck(DeckFactory.makeEuchreDeck()),
      updateGame: setGame,
      }
      setGame(newGame) // define the game object as the new game object that was just created
    }, []); // empty array means only called at the start of the program

   if (!game) {
    return <div>Loading...</div>;
  }

  game.deck.shuffleDeck();

  return (
    <>
    
      <div className="game">
        <ScoreComponent game={game}/>
        <TableComponent game={game}/>
      </div>
    </>
  )
}

export default App
