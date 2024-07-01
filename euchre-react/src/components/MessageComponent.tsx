import { useState, useContext, useEffect } from 'react';
import React from 'react'
import { gameInterface } from '../interfaces/gameInterface'
import { gamePhase } from '../interfaces/gamePhase';
import { GameContext } from './EuchreComponent';



const MessageComponent = () => {
  const game = useContext(GameContext);
  const [message, setMessage] = useState('Welcome');

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
  }, [game]); // Update only when game or game.phase changes
    return (
    <div className="message">{ message }</div>
  )
}

export default MessageComponent