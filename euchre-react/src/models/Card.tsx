


export class Card {
    public faceValue : string;
    public suit : string;

    constructor(faceValue: string = 'unknown', suit : Suit = Suit.Diamonds) {
        this.faceValue = faceValue;
        this.suit = suit;
    }
}