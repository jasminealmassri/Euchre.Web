import { useState } from 'react';
import React from 'react'
import { gameInterface } from '../interfaces/gameInterface'
import { gamePhase } from '../interfaces/gamePhase';

interface props {
    game: gameInterface;
}

const MessageComponent : React.FC<props> = ({game}) => {
  
  const [message, setMessage] = useState('Welcome');
  if (game){
    switch(game.phase) {
        case gamePhase.firstRoundTrump:
            setMessage('Your turn');
            break;

        
       
    }
  }
    return (
    <div className="message">{ message }</div>
  )
}

export default MessageComponent