import React, { useEffect, useState, useContext } from 'react'
import './MessageComponent.css';
import { GameContext } from './EuchreComponent';
import { gamePhase } from '../interfaces/gamePhase';

const MessageComponent = () => {
    
    const [message, setMessage] = useState('Welcome');

    const game = useContext(GameContext);
    useEffect(() => {

    if (game) {
      switch (game.phase) {
        case gamePhase.firstRoundTrump:
          setMessage('Your turn');
          break;
        default:
          setMessage('Welcome'); // Default message if phase doesn't match
          break;
      }
    }
  }, [game]); 

  return (
    <div className="message">{ message }</div>
  )
}

export default MessageComponent