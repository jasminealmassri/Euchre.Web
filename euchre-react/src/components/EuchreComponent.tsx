import React, { useEffect, useState, useRef } from 'react';
import { DeckFactory } from '../models/DeckFactory';
import { Deck } from '../models/Deck';
import { Hand } from '../models/Hand';
import { Trick } from '../models/Trick';
import { Suit } from '../models/Suit';
import { dealCards } from '../functions/Euchre/DealCards';
import { gameInterface } from '../interfaces/gameInterface';
import { gamePhase } from '../interfaces/gamePhase';


  
const startingGame : gameInterface = {
  player1:  {score: 0, hand : new Hand() },
  player2: {score: 0, hand : new Hand() },
  player3: {score: 0, hand : new Hand() },
  player4: {score: 0, hand : new Hand() },
  trick: new Trick(),
  startingPlayer: 0,
  deck: new Deck(DeckFactory.makeEuchreDeck()),
  tricks_won: 0,
  tricks_lost: 0,
  phase: gamePhase.newGame,
  dealer: 0,
  trump: Suit.Hearts,
  updateGame: undefined,
};

export const GameContext = React.createContext<gameInterface>(startingGame);

interface props {
  children: React.ReactNode;
}


const EuchreComponent : React.FC<props> = ({children}) => {
    
    const renderCount = useRef(0);
    const [game, setGame] = useState<gameInterface | undefined>(startingGame);
    const hasMounted = useRef(false);

    const startNewGame = () => {
      const rand = Math.floor(Math.random() * 4);
      let newGame : gameInterface = {
        ...startingGame,
        updateGame: setGame,
        dealer: rand,
      };
     
      newGame.deck.shuffleDeck();
      newGame = dealCards(newGame);

      let newTrick = new Trick();
      newTrick.cards[rand] = newGame.deck.dealCard();
      newGame = {
        ...newGame,
        trick: newTrick,
      } 

      setGame(newGame);
      console.log('New game initialized:', newGame);
    };

    
    useEffect(() => {
      if (!hasMounted.current) {
        startNewGame();
        hasMounted.current = true; 
      }
    }, []); 

    useEffect(() => {
      if (game) {
        console.log('Game phase is now:', game.phase);
      }
    }, [game]); 
    
    if (!game) {
      return <div>Loading...</div>;
    }

    useEffect(() => {
      renderCount.current += 1;
      console.log('render count is ', renderCount.current);
    });
      

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )   
}

export default EuchreComponent

