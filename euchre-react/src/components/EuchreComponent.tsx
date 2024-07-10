import React, { useEffect, useState, useRef } from 'react';
import { EuchreGame } from '../models/EuchreGame';

export const GameContext = React.createContext<EuchreGame>(new EuchreGame());

interface props {
  children: React.ReactNode;
}


const EuchreComponent : React.FC<props> = ({children}) => {
    let newGame = new EuchreGame();
    const renderCount = useRef(0);
    const [game, setGame] = useState<EuchreGame>(newGame);
    const hasMounted = useRef(false);

    useEffect(() => {
      setTimeout(() => {
        if (!hasMounted.current) {
          game.startNewGame(setGame);
          game.firstRoundTrump();
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

