import { gamePhase } from "../../interfaces/gamePhase";
import { gameInterface } from "../../interfaces/gameInterface";

export function dealCards(game : gameInterface) {
   console.log('Deal cards ran');
    const numCards = 5; // Number of cards to deal to each player
    game.deck.dealCards(numCards, game.player1.hand.cards);
    game.deck.dealCards(numCards, game.player2.hand.cards);
    game.deck.dealCards(numCards, game.player3.hand.cards);
    game.deck.dealCards(numCards, game.player4.hand.cards);
    const updatedGame : gameInterface = {
      ...game,
      phase: gamePhase.firstRoundTrump,
    };
    game.updateGame(() => updatedGame);

      // game.updateGame(prevGame => {
      //   if (prevGame) {
      //     console.log('This part of deal Cards ran');
      //     return {
      //   ...game,
      //   player1: { ...game.player1, hand: game.player1.hand },
      //   player2: { ...game.player2, hand: game.player2.hand },
      //   player3: { ...game.player3, hand: game.player3.hand },
      //   player4: { ...game.player4, hand: game.player4.hand },
      //   phase: gamePhase.secondRoundTrump,
      //     }
      //   }
      //   console.log('hi');
      // });

}
   

