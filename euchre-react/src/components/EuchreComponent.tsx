import React, { useEffect, useState, useRef } from 'react';
import { dealCards } from '../functions/Euchre/Game';
import { EuchreGame } from '../models/EuchreGame';
import { firstRoundTrump } from '../functions/Euchre/Game';

export const GameContext = React.createContext<EuchreGame>(new EuchreGame());

interface props {
  children: React.ReactNode;
}


const EuchreComponent : React.FC<props> = ({children}) => {
    let newGame = new EuchreGame();
    const renderCount = useRef(0);
    const [game, setGame] = useState<EuchreGame>(newGame);
    const hasMounted = useRef(false);

    const startNewGame = () => {
      const rand = Math.floor(Math.random() * 4);
      newGame.updateGame = setGame;
      newGame.dealer = rand;     
      newGame.deck.shuffleDeck();
      newGame = dealCards(newGame);

      
      newGame.trick.cards[rand] = newGame.deck.dealCard();

      setGame(newGame);
      console.log('New game initialized:', newGame);

      firstRoundTrump(newGame);
    };

  
    
    useEffect(() => {
      setTimeout(() => {
        if (!hasMounted.current) {
          startNewGame();
          hasMounted.current = true; 
        }
      }, 500);
     
    }, []); 

    useEffect(() => {
      if (game) {
        console.log('Game phase is now:', game.phase);
      }
    }, [game]); 
    
    if (!game) {
      return <div>Something went wrong...</div>;
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

