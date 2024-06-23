import React, { useEffect, useState } from 'react'
import './App.css'
import { DeckFactory } from './models/DeckFactory';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';
import { Trick } from './models/Trick';
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
  score: number;
  hand: Hand;
}

export const GameContext = React.createContext<gameInterface>();


function App() {
  const [game, setGame] = useState<gameInterface>();

  useEffect(() => {
    let newGame : gameInterface = {
      player1: {score: 0, hand : new Hand() },
      player2: {score: 0, hand : new Hand() },
      player3: {score: 0, hand : new Hand() },
      player4: {score: 0, hand : new Hand() },
      trick: {cards: []},
      startingPlayer: 0,
      deck: new Deck(DeckFactory.makeEuchreDeck()),
      tricks_won: 0,
      tricks_lost: 0,
      phase: gamePhase.firstRoundTrump,
      trump: Suit.Hearts,
      updateGame: setGame,
      }
      setGame(newGame)
    }, []); 

   if (!game) {
    return <div>Loading...</div>;
  }

  game.deck.shuffleDeck();

  return (
    <>
      <GameContext.Provider value={game}>
        <div className="game">
          <ScoreComponent/>
          <TableComponent/>
        </div>
      </GameContext.Provider>
    </>
  )
}

export default App
