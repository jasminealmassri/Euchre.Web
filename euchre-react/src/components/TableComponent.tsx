import { GameContext } from '../App';
import React, {useContext} from 'react'

import { DeckFactory } from '../models/DeckFactory'

import { Hand } from '../models/Hand';

import { gameInterface } from '../App';

import HandComponent from './HandComponent';

import TrickComponent from './TrickComponent'

import './TableComponent.css';

interface props {
  //game: gameInterface;
}

const TableComponent : React.FC<props> = () => {

  const game = useContext(GameContext);
  //const deck = DeckFactory.makeEuchreDeck();

  // const hand1 : Hand = game.player1.hand;
  // const hand2 : Hand = game.player2.hand;
  // const hand3 : Hand = game.player3.hand;
  // const hand4 : Hand = game.player4.hand;

  const dealCards = () => {
    const numCards = 5; // Number of cards to deal to each player
    game.deck.dealCards(numCards, game.player1.hand.cards);
    game.deck.dealCards(numCards, game.player2.hand.cards);
    game.deck.dealCards(numCards, game.player3.hand.cards);
    game.deck.dealCards(numCards, game.player4.hand.cards);

    game.updateGame({
      ...game,
      player1: { ...game.player1, hand: game?.player1.hand },
      player2: { ...game.player2, hand: game?.player2.hand },
      player3: { ...game.player3, hand: game?.player3.hand },
      player4: { ...game.player4, hand: game?.player4.hand },
      deck: game.deck,
    });
  };

  return (
    <>
        <p id="player-1-label">You</p>
        <p id="player-2-label">Player 2</p>
        <p id="player-3-label">Player 3</p>
        <p id="player-4-label">Player 4</p>
        <HandComponent key={1} hand={game.player1.hand} className="player-1-hand" isPlayer1={true} />
        <HandComponent key={2} hand={game.player2.hand} className="player-2-hand" isPlayer1={false} />
        <HandComponent key={3} hand={game.player3.hand} className="player-3-hand" isPlayer1={false} />
        <HandComponent key={4} hand={game.player4.hand} className="player-4-hand" isPlayer1={false} />
        <TrickComponent></TrickComponent>
        <button onClick={dealCards}>Deal Cards</button>
    </>
  )
}

export default TableComponent