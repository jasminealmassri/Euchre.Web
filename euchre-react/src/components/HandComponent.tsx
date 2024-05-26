import React from 'react'

import { Card } from '../models/Card'

import { DeckFactory } from '../models/DeckFactory'

import CardComponent from './CardComponent'



const HandComponent = () => {
  //const card = new Card('A', "spades"); 


  const deckFactory : DeckFactory = new DeckFactory();
  const deck = deckFactory.makeEuchreDeck();

  return (
    <>
      {deck.map((card, index) =>
        <CardComponent key={index} card={card} />
      )}
    </>
  );
}
export default HandComponent;