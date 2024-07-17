import React, { useEffect, useState, useRef } from 'react';
import { EuchreGame } from '../models/EuchreGame';
import { gamePhase } from '../interfaces/gamePhase';

export const GameContext = React.createContext<EuchreGame>(new EuchreGame());

interface props {
  children: React.ReactNode;
}


const EuchreComponent : React.FC<props> = ({children}) => {
    let newGame = new EuchreGame();
    const renderCount = useRef(0);
    const [game, setGame] = useState<EuchreGame>(newGame);
    const hasMounted = useRef(false);

    // switch (game.phase) {
    //   case gamePhase.newGame:
    //     game.startNewGame(setGame);
    //     break;
    //   case gamePhase.firstRoundTrump:
    //     game.firstRoundTrump();
    //     break;
    //   case gamePhase.secondRoundTrump:
    //     game.secondRoundTrump();
    //     break;
    //   default:
    //     break;
    // }

    useEffect(() => {
      setTimeout(() => {
        if (!hasMounted.current) {
          game.startNewGame(setGame);
          game.firstRoundTrump();
          //game.secondRoundTrump();
          hasMounted.current = true; 
        }
      }, 500);
     
    }, []); 

    useEffect(() => {
      if (hasMounted.current) {
        switch(game.phase) {
          // case gamePhase.firstRoundTrump:
          //   game.firstRoundTrump();
          //   break;
          case gamePhase.secondRoundTrump:
            console.log('this ran')
            game.secondRoundTrump();
            break;
          default: 
            break;
        }

      }
      
    }, [game.phase])

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

