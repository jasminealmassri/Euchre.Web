import { gamePhase } from "../../interfaces/gamePhase";
import { gameInterface } from "../../interfaces/gameInterface";
import { Hand } from "../../models/Hand";

export function dealCards(game: gameInterface): gameInterface {
  console.log('Deal cards ran');
  const numCards = 5; // Number of cards to deal to each player

  // Create new hand objects to avoid direct mutation
  const newPlayer1Hand = new Hand([...game.player1.hand.cards]);
  const newPlayer2Hand = new Hand([...game.player2.hand.cards]);
  const newPlayer3Hand = new Hand([...game.player3.hand.cards]);
  const newPlayer4Hand = new Hand([...game.player4.hand.cards]);

  game.deck.dealCards(numCards, newPlayer1Hand.cards);
  game.deck.dealCards(numCards, newPlayer2Hand.cards);
  game.deck.dealCards(numCards, newPlayer3Hand.cards);
  game.deck.dealCards(numCards, newPlayer4Hand.cards);

  // Return a new game state object
  return {
    ...game,
    player1: { ...game.player1, hand: newPlayer1Hand },
    player2: { ...game.player2, hand: newPlayer2Hand },
    player3: { ...game.player3, hand: newPlayer3Hand },
    player4: { ...game.player4, hand: newPlayer4Hand },
    phase: gamePhase.firstRoundTrump,
  };
}

