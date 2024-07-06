import { gamePhase } from "../../interfaces/gamePhase";
import { gameInterface } from "../../interfaces/gameInterface";
import { nextWrapIndex } from './Utility.tsx'

export function dealCards(game: gameInterface): gameInterface {

  const numCards = 5; 

  game.deck.dealCards(numCards, game.player1.hand.cards);
  game.deck.dealCards(numCards, game.player2.hand.cards);
  game.deck.dealCards(numCards, game.player3.hand.cards);
  game.deck.dealCards(numCards, game.player4.hand.cards);
  game.phase = gamePhase.firstRoundTrump;

  return game;
}

export async function firstRoundTrump(game : gameInterface): Promise<gameInterface> {
  
  let currIndex = nextWrapIndex(game.dealer, 4);

  for (let i = 0; i < 4; i++) {
    console.log(`Current Index is: ${currIndex}`)
    // prompt player
    if (currIndex == 0) {
      console.log('Setting up prompts for player 0');

      game.prompt1 = 'Pass';
      // game.prompt1Handler = () => {
      //   console.log('Prompt 1 was chosen')
      //   //game.trump = game.trick.cards[game.dealer].suit;
      //   //game.phase = gamePhase.round;
      //   //return game;
      // }
      // game.prompt2Handler = (game : gameInterface) => {
      //   console.log('Prompt 2 was chosen');
      //   game.trump = game.trick.cards[game.dealer].suit;
      //   game.phase = gamePhase.round;
      //   game.prompt1 = '';
      //   game.prompt2 = '';
      //   if (game.updateGame) {
      //     game.updateGame({...game});
      //   }
      // }
      game.prompt2 = `Tell Player ${game.dealer + 1} to pick it up`;
      if (game.updateGame) {
        game.updateGame({...game});
      }
      

      await waitForUserReponse(game);
      // if (pickItUp()) {
    }
    else {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    //   return game;
    //   // }
    //   // else {
    //   //   currIndex = nextWrapIndex(currIndex, 4);
    //   // }
    // }  
    // else {
    //   // setTimeout(()=>{
    //   //   // prompt computer
    //   // },500);
      
    //}
    currIndex = nextWrapIndex(currIndex, 4);
  }

      // remove after
      game.phase = gamePhase.secondRoundTrump;
      return game;
}

function waitForUserReponse(game: gameInterface) : Promise<void> {
  return new Promise<void>(resolve => {
    game.prompt1Handler = () => {
      //console.log('Prompt 1 was chosen');
      game.prompt1 = '';
      game.prompt2 = '';
      resolve();
    };
    game.prompt2Handler = () => {
      //console.log('Prompt 2 was chosen');
      game.trump = game.trick.cards[game.dealer].suit;
      game.phase = gamePhase.round;
      game.prompt1 = '';
      game.prompt2 = '';
      resolve();
    }
    if (game.updateGame) {
      game.updateGame({...game});
    }
  })
}
