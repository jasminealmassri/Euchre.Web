import React from 'react'

import { Card } from '../models/Card'

import { DeckFactory } from '../models/DeckFactory'

import CardComponent from './CardComponent'


interface HandComponentProps {
  cards: Card[];
  className?: string; 
  isPlayer1 : boolean;
}

const HandComponent = ({cards, className, isPlayer1 = false}) => {
  //const card = new Card('A', "spades"); 


  //const deckFactory : DeckFactory = new DeckFactory();
  //const deck = deckFactory.makeEuchreDeck();

  return (
    <div className={className}>
      {cards.map((card, index) =>
        <CardComponent key={index} card={card} flippedUp={isPlayer1} />
      )}
    </div>
  );
}
export default HandComponent;