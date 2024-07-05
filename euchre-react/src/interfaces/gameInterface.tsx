import { gamePhase } from "./gamePhase";
import { Deck } from "../models/Deck";
import { Suit } from "../models/Suit";
import { Trick } from "../models/Trick";
import { Player } from "./player";



export interface gameInterface {
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
    updateGame?: React.Dispatch<React.SetStateAction<gameInterface | undefined>>;
    prompt1: string;
    prompt2: string;
    prompt1Handler: any;
    prompt2Handler : any;
  }