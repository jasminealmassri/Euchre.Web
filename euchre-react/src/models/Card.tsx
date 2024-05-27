


export class Card {
    public faceValue : string;
    public suit : string;
    public faceUp : boolean;

    constructor(faceValue: string = 'unknown', suit : Suit = Suit.Diamonds, faceUp : boolean = true) {
        this.faceValue = faceValue;
        this.suit = suit;
        this.faceUp = faceUp;
    }
}