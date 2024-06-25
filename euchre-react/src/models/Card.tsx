import { Suit } from "./Suit";


export class Card {
    public faceValue : string;
    public suit : Suit;
    public faceUp : boolean;

    constructor(faceValue: string = 'unknown', suit : Suit = Suit.Diamonds, faceUp : boolean = true) {
        this.faceValue = faceValue;
        this.suit = suit;
        this.faceUp = faceUp;
    }
}
