import { GameContext } from './EuchreComponent';
import {useContext} from 'react'
import HandComponent from './HandComponent';
import TrickComponent from './TrickComponent'
import './TableComponent.css';
import PromptComponent from './PromptComponent';
import MessageComponent from './MessageComponent';



const TableComponent = () => {


  const game = useContext(GameContext);
  if (!game) {
    return <div>Loading...</div>; // Render a loading indicator while game is undefined
  }

  // const dealCards = () => {
  //   const numCards = 5; // Number of cards to deal to each player
  //   game.deck.dealCards(numCards, game.player1.hand.cards);
  //   game.deck.dealCards(numCards, game.player2.hand.cards);
  //   game.deck.dealCards(numCards, game.player3.hand.cards);
  //   game.deck.dealCards(numCards, game.player4.hand.cards);

  //   game.updateGame({
  //     ...game,
  //     player1: { ...game.player1, hand: game.player1.hand },
  //     player2: { ...game.player2, hand: game.player2.hand },
  //     player3: { ...game.player3, hand: game.player3.hand },
  //     player4: { ...game.player4, hand: game.player4.hand },
  //     deck: game.deck,
  //   });
  // };

  return (
    <>
        <MessageComponent/>
        <PromptComponent/>
        <p id="player-1-label">You</p>
        <p id="player-2-label">Player 2</p>
        <p id="player-3-label">Player 3</p>
        <p id="player-4-label">Player 4</p>
        <HandComponent key={1} hand={game.player1.hand} className="player-1-hand" playerIndex={0} />
        <HandComponent key={2} hand={game.player2.hand} className="player-2-hand" playerIndex={1} />
        <HandComponent key={3} hand={game.player3.hand} className="player-3-hand" playerIndex={2} />
        <HandComponent key={4} hand={game.player4.hand} className="player-4-hand" playerIndex={3} />
        <TrickComponent trick={game.trick}></TrickComponent>
        {/* <button onClick={dealCards}>Deal Cards</button> */}
    </>
  )
}

export default TableComponent