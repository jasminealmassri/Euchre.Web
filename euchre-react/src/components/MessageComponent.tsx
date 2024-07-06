import { useContext } from 'react'
import './MessageComponent.css';
import { GameContext } from './EuchreComponent';

const MessageComponent = () => {
    
  const game = useContext(GameContext);

  return (
    <div className="message">{ game.message }</div>
  )
}

export default MessageComponent