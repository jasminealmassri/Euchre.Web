import React, { useEffect, useState } from 'react'
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
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
  trick : Trick;
  startingPlayer: number;
  tricks_won: number;
  tricks_lost: number;
  trump: Suit;
  deck: Deck;
  phase: gamePhase;
  // This is a function pointer
  updateGame: React.Dispatch<React.SetStateAction<gameInterface>>;
}

export enum Suit {
  Diamonds = "diamonds",
  Spades = "spades",
  Clubs = "clubs",
  Hearts = "hearts"
}

export enum gamePhase {
  firstRoundTrump,
  secondRoundTrump,
  round,
}

interface Player {
  // pointers to the use State variables that get updated
  score: number;
  hand: Hand;
}

export const GameContext = React.createContext({});


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
      tricks_won: 0,
      tricks_lost: 0,
      trump: Suit.Hearts,
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
      <GameContext.Provider value={[game, setGame]}>
        <div className="game">
          <ScoreComponent/>
          <TableComponent game={game}/>
        </div>
      </GameContext.Provider>
    </>
  )
}

export default App
