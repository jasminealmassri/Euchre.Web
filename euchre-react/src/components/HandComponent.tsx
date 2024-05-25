import React from 'react'

import { Card, Suit } from '../models/Card'
import CardComponent from './CardComponent'



const HandComponent = () => {
  const card = new Card('A', Suit.Spades); // Ensure the Suit enum is imported and used correctly

  return (
    <>
      <CardComponent card={card} />
      <CardComponent card={card} />
      <CardComponent card={card} />
    </>
  );
}
export default HandComponent;