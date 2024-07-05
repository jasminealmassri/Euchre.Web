import { gamePhase } from "../../interfaces/gamePhase";
import { gameInterface } from "../../interfaces/gameInterface";

export function dealCards(game: gameInterface): gameInterface {

  const numCards = 5; 

  game.deck.dealCards(numCards, game.player1.hand.cards);
  game.deck.dealCards(numCards, game.player2.hand.cards);
  game.deck.dealCards(numCards, game.player3.hand.cards);
  game.deck.dealCards(numCards, game.player4.hand.cards);
  game.phase = gamePhase.firstRoundTrump;

  return game;
}

