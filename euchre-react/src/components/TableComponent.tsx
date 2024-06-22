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

  const [game, setGame] = useContext(GameContext);
  //const deck = DeckFactory.makeEuchreDeck();

  const hand1 : Hand = game.player1.hand;
  const hand2 : Hand = game.player2.hand;
  const hand3 : Hand = game.player3.hand;
  const hand4 : Hand = game.player4.hand;

  const dealCards = () => {
    const numCards = 5; // Number of cards to deal to each player
    game.deck.dealCards(numCards, hand1.cards);
    game.deck.dealCards(numCards, hand2.cards);
    game.deck.dealCards(numCards, hand3.cards);
    game.deck.dealCards(numCards, hand4.cards);

    game.updateGame({
      ...game,
      player1: { ...game.player1, hand: hand1 },
      player2: { ...game.player2, hand: hand2 },
      player3: { ...game.player3, hand: hand3 },
      player4: { ...game.player4, hand: hand4 },
      deck: game.deck,
    });
  };

  return (
    <>
        <p id="player-1-label">You</p>
        <p id="player-2-label">Player 2</p>
        <p id="player-3-label">Player 3</p>
        <p id="player-4-label">Player 4</p>
        <HandComponent key={1} initialHand={hand1} className="player-1-hand" isPlayer1={true}/>
        <HandComponent key={2} initialHand={hand2} className="player-2-hand" isPlayer1={false}/>
        <HandComponent key={3} initialHand={hand3} className="player-3-hand" isPlayer1={false}/>
        <HandComponent key={4} initialHand={hand4} className="player-4-hand" isPlayer1={false}/>
        <TrickComponent></TrickComponent>
        <button onClick={dealCards}>Deal Cards</button>
    </>
  )
}

export default TableComponent