import { gamePhase } from "../interfaces/gamePhase";
import { Deck } from "./Deck";
import { Suit } from "./Suit";
import { Trick } from "./Trick";
import { Player } from "../interfaces/player";
import { Hand } from "./Hand";
import { DeckFactory } from "./DeckFactory";
import { Card } from "./Card";



export class EuchreGame {
    player1: Player;
    player2: Player;
    player3: Player;
    player4: Player;
    trick : Trick;
    startingPlayer: number;
    tricks_won: number;
    tricks_lost: number;
    trump?: Suit;
    deck: Deck;
    dealer: number;
    phase: gamePhase;
    updateGame: any;
    prompt1: string;
    prompt2: string;
    prompt1Handler: any;
    prompt2Handler : any;
    message: string;
    userTurnToPlay: boolean;
    constructor() {
      this.player1 =  {score: 0, hand : new Hand() };
      this.player2 = {score: 0, hand : new Hand() };
      this.player3 = {score: 0, hand : new Hand() };
      this.player4 = {score: 0, hand : new Hand() };
      this.trick = new Trick();
      this.startingPlayer = 0;
      this.deck = new Deck(DeckFactory.makeEuchreDeck());
      this.tricks_won = 0;
      this.tricks_lost = 0;
      this.phase = gamePhase.newGame;
      this.dealer = 0;
      this.updateGame = undefined;
      this.prompt1 = '';
      this.prompt2 = '';
      this.prompt1Handler = undefined;
      this.prompt2Handler = undefined;
      this.message = 'Welcome';
      this.userTurnToPlay = false;
    }
    test() : void {
      console.log('test method');
    }

    test2() : void {
      this.trick.cards = [new Card('9', Suit.Clubs, false), new Card('10', Suit.Hearts, true)];
      //this.updateGame(this);
    }
  }