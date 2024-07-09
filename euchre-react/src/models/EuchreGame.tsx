import { gamePhase } from "../interfaces/gamePhase";
import { Deck } from "./Deck";
import { Suit } from "./Suit";
import { Trick } from "./Trick";
import { Player } from "../interfaces/player";
import { Hand } from "./Hand";
import { DeckFactory } from "./DeckFactory";
import { Card } from "./Card";
import { dealCards, firstRoundTrump } from "../functions/Euchre/Game";



export class EuchreGame {

    player1: Player;
    player2: Player;
    player3: Player;
    player4: Player;
    playersArray: Player[];
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
      this.playersArray = [this.player1, this.player2, this.player3, this.player4];
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
    // test() : void {
    //   console.log('test method');
    // }

    // test2() : void {
    //   this.trick.cards = [new Card('9', Suit.Clubs, false), new Card('10', Suit.Hearts, true)];
    // }
    startNewGame(setGame : any) : void {
      const rand = Math.floor(Math.random() * 4);
      this.updateGame = setGame;
      this.dealer = rand;
      this.deck.shuffleDeck();
      this.dealCards();
      this.trick.cards[rand] = this.deck.dealCard();
      this.phase = gamePhase.firstRoundTrump;
      this.updateGame(this);
      console.log("refactor game intialized", JSON.stringify(this));
      firstRoundTrump(this); //refactor further after I make sure this works
    }

    dealCards() {
      for (let player of this.playersArray) {
        this.deck.dealCards(5, player.hand.cards);
      }
    }
  }