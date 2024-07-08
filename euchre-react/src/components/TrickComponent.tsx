import CardComponent from './CardComponent';
import { GameContext } from './EuchreComponent';
import { useContext } from 'react';
import './TrickComponent.css';


const TrickComponent = () => {

  const game =  useContext(GameContext);
  const player_classes : string[] = ["player-1-card", "player-2-card", "player-3-card", "player-4-card"];
  return (
    <div className="trick">
        {game.trick.cards.map((card, index) => (
            <div key={index} className={player_classes[index]}>
                <CardComponent key={index} card={card} flippedUp={true} />
            </div>
        ))}
    </div>
    );
}

export default TrickComponent