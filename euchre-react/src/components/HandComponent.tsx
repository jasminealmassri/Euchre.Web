import React from 'react'

import { useState } from 'react'

import { Card } from '../models/Card'
import { Hand } from '../models/Hand'

import { DeckFactory } from '../models/DeckFactory'

import CardComponent from './CardComponent'


interface HandComponentProps {
  hand : Hand;
  //cards: Card[];
  className?: string; 
  isPlayer1 : boolean;
}


const HandComponent = ({hand, className, isPlayer1 = false} : HandComponentProps) => {
  
  const [newHand, setNewHand] = useState<Hand>(hand);

  const playCard = (index: number) => {
    const playedCard = newHand.playCard(index);
    setNewHand(new Hand([...newHand.cards]));
  }

  return (
    <>
      <div className={className}>
        {hand.cards.map((card, index) =>
          <CardComponent key={index} card={card} flippedUp={isPlayer1} onClick={() => playCard(index)}/>
        )}
      </div>
      {/* <button onClick={() => playCard(3)}>Play Card</button> */}
    </>
  );
}
export default HandComponent;