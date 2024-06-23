import {useContext} from 'react'
import { Hand } from '../models/Hand';
import { GameContext } from '../App';
import CardComponent from './CardComponent'


interface HandComponentProps {
  hand: Hand;
  className?: string; 
  playerIndex: number;
}


const HandComponent = ({hand, className, playerIndex} : HandComponentProps) => {
  
  const game = useContext(GameContext);

  return (
    <>
      <div className={className}>
        {hand.cards.map((card, index) =>
        <CardComponent key={index} card={card} flippedUp={playerIndex == 0} onClick={() => {  
          if (playerIndex == 0) {
          game.trick.cards[playerIndex] = hand.playCard(index); 
          game.updateGame({...game});
          console.log(`In hand component, hand is now ${JSON.stringify(hand)}`)}}}/>
        )}
      </div>
    </>
  );
}
export default HandComponent;