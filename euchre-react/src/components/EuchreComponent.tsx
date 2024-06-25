import React, { useEffect, useState, useContext } from 'react';
import { DeckFactory } from '../models/DeckFactory';
import { Deck } from '../models/Deck';
import { Hand } from '../models/Hand';
import { Trick } from '../models/Trick';
import { Suit } from '../models/Suit';

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
    updateGame?: React.Dispatch<React.SetStateAction<gameInterface | undefined>>;
  }
  
  export enum gamePhase {
    newGame,
    firstRoundTrump,
    secondRoundTrump,
    round,
  }
  
  interface Player {
    score: number;
    hand: Hand;
  }


  export const startingGame : gameInterface = {
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
    trump: Suit.Hearts,
    updateGame: undefined,
};

export const GameContext = React.createContext<gameInterface>(startingGame);

export interface props {
  children: React.ReactNode;
}

const EuchreComponent : React.FC<props> = ({children}) => {

    const [game, setGame] = useState<gameInterface>();

    const startNewGame = () => {
      const newGame : gameInterface = {
        ...startingGame,
        updateGame: setGame,
      };

      if (newGame) {
        
        newGame.deck.shuffleDeck();
        const numCards = 5; // Number of cards to deal to each player
        newGame.deck.dealCards(numCards, newGame.player1.hand.cards);
        newGame.deck.dealCards(numCards, newGame.player2.hand.cards);
        newGame.deck.dealCards(numCards, newGame.player3.hand.cards);
        newGame.deck.dealCards(numCards, newGame.player4.hand.cards);
    
        if (newGame.updateGame) {
          newGame.updateGame({
            ...newGame,
            player1: { ...newGame.player1, hand: newGame.player1.hand },
            player2: { ...newGame.player2, hand: newGame.player2.hand },
            player3: { ...newGame.player3, hand: newGame.player3.hand },
            player4: { ...newGame.player4, hand: newGame.player4.hand },
            deck: newGame.deck,
            phase: gamePhase.firstRoundTrump,
           
          });
        }
      }
    };

    
    useEffect(() => {
        // const newGame : gameInterface = {
        //   ...startingGame,
        //   updateGame: setGame,
        // }
        startNewGame();
        // Start a new game
        
    }, []); 

    useEffect(() => {
      console.log(`${JSON.stringify(game)}`);
    }, [game]); // Log whenever game state changes
    
      if (!game) {
      return <div>Loading...</div>;
    }
    

    //const game = useContext(GameContext);

   
    

    return (
        <GameContext.Provider value={game}>
            {children}
            <h2>hi</h2>
        </GameContext.Provider>
    )   
}

export default EuchreComponent

