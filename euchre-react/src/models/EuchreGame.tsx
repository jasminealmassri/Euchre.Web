import { gamePhase } from "../interfaces/gamePhase";
import { Deck } from "./Deck";
import { Suit } from "./Suit";
import { Trick } from "./Trick";
import { Player } from "./Player";
import { Computer } from "./Computer";
import { DeckFactory } from "./DeckFactory";
import { nextWrapIndex } from "../functions/Euchre/Utility";

export class EuchreGame {
  player1: Player;
  player2: Computer;
  player3: Computer;
  player4: Computer;
  playersArray: any[];
  trick: Trick;
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
  prompt3: string;
  prompt4: string;
  prompt1Handler: any;
  prompt2Handler: any;
  prompt3Handler: any;
  prompt4Handler: any;
  message: string;
  userTurnToPlay: boolean;

  constructor() {
    this.player1 = new Player();
    this.player2 = new Computer();
    this.player3 = new Computer();
    this.player4 = new Computer();
    this.playersArray = [
      this.player1,
      this.player2,
      this.player3,
      this.player4,
    ];
    this.trick = new Trick();
    this.startingPlayer = 0;
    this.deck = new Deck(DeckFactory.makeEuchreDeck());
    this.tricks_won = 0;
    this.tricks_lost = 0;
    this.phase = gamePhase.newGame;
    this.dealer = 0;
    this.updateGame = undefined;
    this.prompt1 = "";
    this.prompt2 = "";
    this.prompt3 = "";
    this.prompt4 = "";
    this.prompt1Handler = undefined;
    this.prompt2Handler = undefined;
    this.prompt3Handler = undefined;
    this.prompt4Handler = undefined;
    this.message = "Welcome";
    this.userTurnToPlay = false;

    this.dealCards = this.dealCards.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.firstRoundTrump = this.firstRoundTrump.bind(this);
    this.UserReponseFirstRoundTrump =
      this.UserReponseFirstRoundTrump.bind(this);
    this.secondRoundTrump = this.secondRoundTrump.bind(this);
    this.UserReponseSecondRoundTrump =
      this.UserReponseSecondRoundTrump.bind(this);
  }

  dealCards() {
    for (let player of this.playersArray) {
      this.deck.dealCards(5, player.hand.cards);
    }
    this.updateGame({ ...this });
  }

  startNewGame(setGame: any): void {
    const rand = Math.floor(Math.random() * 4);
    this.updateGame = setGame;
    this.dealer = rand;
    this.deck.shuffleDeck();
    this.dealCards();
    this.updateGame({ ...this });
    this.trick.cards[rand] = this.deck.dealCard();
    this.phase = gamePhase.firstRoundTrump;
    this.updateGame({ ...this });
    console.log("Refactor game intialized", JSON.stringify(this));
  }

  async firstRoundTrump(): Promise<void> {
    console.log(`first round trump began`);

    let currIndex = nextWrapIndex(this.dealer, 4);
    for (let i = 0; i < 4; i++) {
      if (this.phase != gamePhase.firstRoundTrump) {
        break;
      }

      if (currIndex == 0) {
        this.message = "Your turn";
        this.prompt1 = "Pass";
        switch (this.dealer) {
          case 0:
            this.prompt2 = "Pick it up?";
            break;
          case 2:
            this.prompt2 = "Tell Player 3 to pick it up and go alone?";
            break;
          default:
            this.prompt2 = `Tell Player ${this.dealer + 1} to pick it up?`;
            break;
        }
        this.updateGame({ ...this });

        await this.UserReponseFirstRoundTrump();

        this.updateGame({ ...this });
      } else {
        this.message = `Player ${currIndex + 1} passed`;
        this.updateGame({ ...this });
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      currIndex = nextWrapIndex(currIndex, 4);
    }

    this.updateGame({ ...this });
    console.log(`first round trump ended`);
  }

  UserReponseFirstRoundTrump(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.prompt1Handler = () => {
        console.log("Prompt 1 was chosen");
        this.prompt1 = "";
        this.prompt2 = "";
        this.phase = gamePhase.secondRoundTrump;
        resolve();
      };
      this.prompt2Handler = () => {
        console.log("Prompt 2 was chosen");
        this.trump = this.trick.cards[this.dealer].suit;
        this.message = `Trump is ${this.trump}`;
        this.phase = gamePhase.round;
        this.prompt1 = "";
        this.prompt2 = "";
        resolve();
      };

      this.updateGame({ ...this });
    });
  }

  async secondRoundTrump(): Promise<void> {
    console.log(`secondRoundTrump() began`);
    let currIndex = nextWrapIndex(this.dealer, 4);
    for (let i = 0; i < 4; i++) {
      if (this.phase != gamePhase.secondRoundTrump) {
        break;
      }

      if (currIndex == 0) {
        this.message = "Your turn";
        this.prompt1 = "Pass";
        this.prompt2 = "Choose trump?";
        this.updateGame({ ...this });

        await this.UserReponseSecondRoundTrump();

        this.updateGame({ ...this });
      } else {
        this.message = `Player ${currIndex + 1} passed`;
        this.updateGame({ ...this });
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      currIndex = nextWrapIndex(currIndex, 4);
    }

    this.phase = gamePhase.secondRoundTrump;
    console.log(`secondRoundTrump() ended`);
  }

  UserReponseSecondRoundTrump(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.prompt1Handler = () => {
        console.log("Prompt 1 was chosen");
        this.prompt1 = "";
        this.prompt2 = "";
        resolve();
      };
      this.prompt2Handler = () => {
        console.log("Prompt 2 was chosen");
        this.trump = Suit.Spades; // THIS HAS TO BE CHANGED
        this.message = `Trump is ${this.trump}`;
        this.phase = gamePhase.round;
        this.trick.cards = [];
        this.prompt1 = "";
        this.prompt2 = "";
        resolve();
      };

      this.updateGame({ ...this });
    });
  }
}
