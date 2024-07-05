import { gamePhase } from "../../interfaces/gamePhase";
import { gameInterface } from "../../interfaces/gameInterface";
import { nextWrapIndex } from './Utility.tsx'
import { pickItUp } from "./Player";

export function dealCards(game: gameInterface): gameInterface {

  const numCards = 5; 

  game.deck.dealCards(numCards, game.player1.hand.cards);
  game.deck.dealCards(numCards, game.player2.hand.cards);
  game.deck.dealCards(numCards, game.player3.hand.cards);
  game.deck.dealCards(numCards, game.player4.hand.cards);
  game.phase = gamePhase.firstRoundTrump;

  return game;
}

export function firstRoundTrump(game : gameInterface): gameInterface {
  
  let currIndex = nextWrapIndex(game.dealer, 4);

  for (let i = 0; i < 4; i++) {
    // prompt player
    if (currIndex == 0) {
      game.prompt1 = 'Pass';
      game.prompt1Handler = () => {
        console.log('Prompt 1 was chosen')
        //game.trump = game.trick.cards[game.dealer].suit;
        //game.phase = gamePhase.round;
        //return game;
      }
      game.prompt2Handler = (game : gameInterface) => {
        console.log('Prompt 2 was chosen');
        game.trump = game.trick.cards[game.dealer].suit;
        game.phase = gamePhase.round;
        game.updateGame({...game});
      }
      game.prompt2 = `Tell Player ${game.dealer + 1} to pick it up`;
      // if (pickItUp()) {

      return game;
      // }
      // else {
      //   currIndex = nextWrapIndex(currIndex, 4);
      // }
    }  
    else {
      // setTimeout(()=>{
      //   // prompt computer
      // },500);
      
    }
    currIndex = nextWrapIndex(currIndex, 4);
  }

      // remove after
      gamePhase.secondRoundTrump;
      return game;
}

