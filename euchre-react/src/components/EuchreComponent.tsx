import React, { useEffect, useState, useContext, useRef } from 'react';
import { DeckFactory } from '../models/DeckFactory';
import { Deck } from '../models/Deck';
import { Hand } from '../models/Hand';
import { Trick } from '../models/Trick';
import { Suit } from '../models/Suit';

import { dealCards } from '../functions/Euchre/DealCards';
import { gameInterface } from '../interfaces/gameInterface';
import { gamePhase } from '../interfaces/gamePhase';
import { render } from 'react-dom';

  
const startingGame : gameInterface = {
  player1:  {score: 0, hand : new Hand() },
  player2: {score: 0, hand : new Hand() },
  player3: {score: 0, hand : new Hand() },
  player4: {score: 0, hand : new Hand() },
  trick: {cards: []},
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
    //console.log('render count is ', renderCount);
    const [game, setGame] = useState<gameInterface | undefined>(startingGame);

    const startNewGame = () => {
      const newGame : gameInterface = {
        ...startingGame,
        updateGame: setGame,
      };
     
      newGame.deck.shuffleDeck();
      dealCards(newGame);
      setGame(newGame);
      console.log('New game initialized:', newGame);
    };

    
    useEffect(() => {
      console.log('EuchreComponent mounted');
        startNewGame();
    }, []); 

    useEffect(() => {
      console.log('Game state updated:', game);
      if (game) {
        console.log('Game phase is now:', game.phase);
      }
    }, [game]); // Log whenever game state changes
    
      if (!game) {
      return <div>Loading...</div>;
    }

    useEffect(() => {
      renderCount.current += 1;
      console.log('render count is ', renderCount.current);
    });
  
    

    //const game = useContext(GameContext);

   
    

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )   
}

export default EuchreComponent

