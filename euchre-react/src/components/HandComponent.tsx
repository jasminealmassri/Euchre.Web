import React, {useContext} from 'react'
import { useState } from 'react';
import { Card } from '../models/Card';
import { Hand } from '../models/Hand';

import { DeckFactory } from '../models/DeckFactory'
import { GameContext } from '../App';

import CardComponent from './CardComponent'


interface HandComponentProps {
  hand: Hand;
  //cards: Card[];
  className?: string; 
  isPlayer1 : boolean;
}


const HandComponent = ({hand, className, isPlayer1 = false} : HandComponentProps) => {
  
  //const [hand, setHand] = useState<Hand>(initialHand);
  const game = useContext(GameContext);

  // const playCard = (index: number) => {
  //   hand.playCard(index);
  //   setHand(new Hand([...hand.cards])); // Update the state to trigger rerender
  // }
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
        <CardComponent key={index} card={card} flippedUp={isPlayer1} onClick={() => { 
          hand.playCard(index); 
          //game.updateGame(game);
          game.updateGame({...game});
          console.log(`In hand component, hand is now ${JSON.stringify(hand)}`)}}/>
        )}
      </div>
      {/* <button onClick={() => playCard(3)}>Play Card</button> */}
    </>
  );
}
export default HandComponent;