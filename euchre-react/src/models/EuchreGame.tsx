import { gamePhase } from "../interfaces/gamePhase";
import { Deck } from "./Deck";
import { Suit } from "./Suit";
import { Trick } from "./Trick";
import { Player } from "./Player";
import { Computer } from "./Computer";
import { Hand } from "./Hand";
import { DeckFactory } from "./DeckFactory";
import { nextWrapIndex, getOffsuit } from "../functions/Euchre/Utility";

export class EuchreGame {

    player1: Player;
    player2: Computer;
    player3: Computer;
    player4: Computer;
    playersArray: any[];
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
      this.player1 = new Player();
      this.player2 = new Computer();
      this.player3 = new Computer();
      this.player4 = new Computer();
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

    dealCards() {
      for (let player of this.playersArray) {
        this.deck.dealCards(5, player.hand.cards);
      }
      this.updateGame({...this});
    }

    startNewGame(setGame : any) : void {
      const rand = Math.floor(Math.random() * 4);
      this.updateGame = setGame;
      this.dealer = rand;
      this.deck.shuffleDeck();
      this.dealCards();
      this.updateGame({...this});
      this.trick.cards[rand] = this.deck.dealCard();
      this.phase = gamePhase.firstRoundTrump;
      this.updateGame({...this});
      console.log("refactor game intialized", JSON.stringify(this));
    }

    async firstRoundTrump() : Promise<void> {

      let currIndex = nextWrapIndex(this.dealer, 4);
      for (let i = 0; i < 4; i++) {
        if (this.phase != gamePhase.firstRoundTrump)
        {
          break;
        }

        if (currIndex == 0) {
          this.message = 'Your turn';
          this.prompt1 = 'Pass';
          switch(this.dealer){
            case 0:
              this.prompt2 = 'Pick it up?';
              break;
            case 2:
              this.prompt2 = 'Tell Player 3 to pick it up and go alone?';
              break;
            default:
              this.prompt2 = `Tell Player ${this.dealer + 1} to pick it up?`
              break;
          }
          this.updateGame({...this});

          await this.waitForUserReponse();
          
          this.updateGame({...this});
        }
        else {
          this.message = `Player ${currIndex + 1} passed`;
          this.updateGame({...this});
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        currIndex = nextWrapIndex(currIndex, 4);
      }

      this.phase = gamePhase.secondRoundTrump;
    }

    waitForUserReponse() : Promise<void> {
      return new Promise<void>(resolve => {
        this.prompt1Handler = () => {
          console.log('Prompt 1 was chosen');
          this.prompt1 = '';
          this.prompt2 = '';
          resolve();
        };
        this.prompt2Handler = () => {
          console.log('Prompt 2 was chosen');
          this.trump = this.trick.cards[this.dealer].suit;
          this.message = `Trump is ${this.trump}`;
          this.phase = gamePhase.round;
          this.trick.cards = [];
          this.prompt1 = '';
          this.prompt2 = '';
          resolve();
        }
    
        this.updateGame({...this});
      })
  }
}

