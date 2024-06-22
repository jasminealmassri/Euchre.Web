import React from 'react'

import { useState } from 'react';
import { Card } from '../models/Card';
import { Hand } from '../models/Hand';

import { DeckFactory } from '../models/DeckFactory'

import CardComponent from './CardComponent'


interface HandComponentProps {
  initialHand : Hand;
  //cards: Card[];
  className?: string; 
  isPlayer1 : boolean;
}


const HandComponent = ({initialHand, className, isPlayer1 = false} : HandComponentProps) => {
  
  const [hand, setHand] = useState<Hand>(initialHand);

  const playCard = (index: number) => {
    hand.playCard(index);
    setHand(new Hand([...hand.cards])); // Update the state to trigger rerender
  }
  //const [newHand, setNewHand] = useState<Hand>(hand);

  // const playCard = (index: number) => {
  //   const playedCard = newHand.playCard(index);
  //   console.log(`Played card is: ${JSON.stringify(playedCard)}`)
  //   console.log(`Hand now is: ${JSON.stringify(hand)}`)
  //   setNewHand(new Hand([...newHand.cards]));
  // }

  return (
    <>
      <div className={className}>
        {hand.cards.map((card, index) =>
        <CardComponent key={index} card={card} flippedUp={isPlayer1} onClick={() => { playCard(index); console.log(`In hand component, hand is now ${JSON.stringify(hand)}`)}}/>
        )}
      </div>
      {/* <button onClick={() => playCard(3)}>Play Card</button> */}
    </>
  );
}
export default HandComponent;