


export class Card {
    public faceValue : string;
    public suit : string;
    public faceUp : boolean;

    constructor(faceValue: string = 'unknown', suit : string, faceUp : boolean = true) {
        this.faceValue = faceValue;
        this.suit = suit;
        this.faceUp = faceUp;
    }
}
