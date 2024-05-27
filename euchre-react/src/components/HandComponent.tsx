import React from 'react'

import { Card } from '../models/Card'

import { DeckFactory } from '../models/DeckFactory'

import CardComponent from './CardComponent'


interface HandComponentProps {
  cards: Card[];
  className?: string; 
}

const HandComponent = ({cards, className}) => {
  //const card = new Card('A', "spades"); 


  //const deckFactory : DeckFactory = new DeckFactory();
  //const deck = deckFactory.makeEuchreDeck();

  return (
    <div className={className}>
      {cards.map((card, index) =>
        <CardComponent key={index} card={card} flippedUp={true} />
      )}
    </div>
  );
}
export default HandComponent;