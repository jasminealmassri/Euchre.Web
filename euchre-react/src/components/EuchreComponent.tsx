import React, { useEffect, useState, useContext } from 'react';
import { DeckFactory } from '../models/DeckFactory';
import { Deck } from '../models/Deck';
import { Hand } from '../models/Hand';
import { Trick } from '../models/Trick';

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
    phase: gamePhase.firstRoundTrump,
    trump: Suit.Hearts,
    updateGame: undefined,
};

export const GameContext = React.createContext<gameInterface>(startingGame);


const EuchreComponent = ({children}) => {

    const [game, setGame] = useState<gameInterface>();

    useEffect(() => {
        let newGame : gameInterface = {
          ...startingGame,
          updateGame: setGame,
        }
          setGame(newGame)
        }, []); 
    
       if (!game) {
        return <div>Loading...</div>;
      }
    
      game.deck.shuffleDeck();

    //const game = useContext(GameContext);

    const dealCards = () => {
    const numCards = 5; // Number of cards to deal to each player
    game.deck.dealCards(numCards, game.player1.hand.cards);
    game.deck.dealCards(numCards, game.player2.hand.cards);
    game.deck.dealCards(numCards, game.player3.hand.cards);
    game.deck.dealCards(numCards, game.player4.hand.cards);

    game.updateGame({
      ...game,
      player1: { ...game.player1, hand: game.player1.hand },
      player2: { ...game.player2, hand: game.player2.hand },
      player3: { ...game.player3, hand: game.player3.hand },
      player4: { ...game.player4, hand: game.player4.hand },
      deck: game.deck,
    });
    }

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )   
}
export default EuchreComponent

