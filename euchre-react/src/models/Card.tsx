export const enum Suit {
    Diamonds = "diamonds",
    Hearts = "hearts",
    Spades = "spades",
    Clubs = "clubs"
}


export class Card {
    public faceValue : string;
    public suit : Suit;

    constructor(faceValue: string = 'unknown', suit : Suit = Suit.Diamonds) {
        this.faceValue = faceValue;
        this.suit = suit;
    }
}