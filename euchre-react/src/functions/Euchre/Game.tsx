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
    if (game.phase != gamePhase.firstRoundTrump)
    {
      break;
    }

    console.log(`Current Index is: ${currIndex}`)
    // prompt player
    if (currIndex == 0) {
      game.message = 'Your turn';
      game.prompt1 = 'Pass';
      switch(game.dealer) {
        case 0:
          game.prompt2 = 'Pick it up?';
          break;
        case 2: 
          game.prompt2 = 'Tell Player 3 to pick it up and go alone?';
          break;
        default:
          game.prompt2 = `Tell Player ${game.dealer + 1} to pick it up`;
          break;

      }
      //game.dealer === 2 ? `Tell Player 3 to pick it up and go alone?` : `Tell Player ${game.dealer + 1} to pick it up`;
      if (game.updateGame) {
        game.updateGame({...game});
      }
      
      await waitForUserReponse(game);
      if (game.updateGame) {
        game.updateGame({...game});
      }

    }
    else {
      game.message = `Player ${currIndex + 1} passed`;
      if (game.updateGame) {
        game.updateGame({...game});
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    currIndex = nextWrapIndex(currIndex, 4);
  }

      // remove after
      game.phase = gamePhase.secondRoundTrump;
      return game;
}

function waitForUserReponse(game: gameInterface) : Promise<void> {
  return new Promise<void>(resolve => {
    game.prompt1Handler = () => {
      console.log('Prompt 1 was chosen');
      game.prompt1 = '';
      game.prompt2 = '';
      resolve();
    };
    game.prompt2Handler = () => {
      console.log('Prompt 2 was chosen');
      game.trump = game.trick.cards[game.dealer].suit;
      game.message = `Trump is ${game.trump}`;
      game.phase = gamePhase.round;
      game.trick.cards = [];
      game.prompt1 = '';
      game.prompt2 = '';
      resolve();
    }
    if (game.updateGame) {
      game.updateGame({...game});
    }
  })
}
