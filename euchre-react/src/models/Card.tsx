import { Suit } from "../App";


export class Card {
    public faceValue : string;
    public suit : Suit;
    public faceUp : boolean;

    constructor(faceValue: string = 'unknown', suit : Suit, faceUp : boolean = true) {
        this.faceValue = faceValue;
        this.suit = suit;
        this.faceUp = faceUp;
    }
}
