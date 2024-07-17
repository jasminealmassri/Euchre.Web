import { useState, useContext, useEffect } from 'react';
import { GameContext } from './EuchreComponent';
import './PromptComponent.css'

const dealerClasses : string[] = ['player_1_is_dealer', 'player_2_is_dealer', 'player_3_is_dealer', 'player_4_is_dealer' ]

const PromptComponent = () => {
  const game = useContext(GameContext);
  const [dealerCSSClass, setdealerCSSClass] = useState('player_1_is_dealer');

  useEffect(() => {
    if (game) {
      setdealerCSSClass(dealerClasses[game.dealer]);
    }
    }, [game]);
  

    return (
      <>
        <div className="prompt_container">
          {
            game.prompt1 && (
              <button className="prompt_choice1" onClick={ () => game.prompt1Handler(game) }>{ game.prompt1 }</button>
            )
          }
          {
            game.prompt2 && (
              <button className="prompt_choice2" onClick={ () => game.prompt2Handler(game) }>{ game.prompt2 }</button>
            )
          }
          {
            game.prompt3 && (
              <button className="prompt_choice3" onClick={ () => game.prompt3Handler(game) }>{ game.prompt3 }</button>
            )
          }
          {
            game.prompt4 && (
              <button className="prompt_choice4" onClick={ () => game.prompt4Handler(game) }>{ game.prompt4 }</button>
            )
          }
        </div>
        <div className={`${dealerCSSClass}`}>Dealer</div>
      </>

    )

  
  

  

}

export default PromptComponent