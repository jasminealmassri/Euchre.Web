import { Card } from "./Card";

export class DeckFactory {
    suits : string[] = ["diamonds", "clubs", "spades", "hearts" ];
    faceValues : string[] = ["1", "2", "3", "4", "5", "6", "7" , "8", "9", "10", "J", "Q", "K", "A"];
    euchreFaceValues: string[] = ["9", "10", "J", "Q", "K", "A"];


    constructor() {
       
    }

    public makeDeck() : Card[] {

        let deck : Card[] = [];

        for (let suit of this.suits)
            {
                for (let value of this.faceValues)
                    {
                        deck.push(new Card(suit, value));
                    }
            }
        return deck;
    }

    public makeEuchreDeck() : Card[] {

        let deck : Card[] = [];

        for (let suit of this.suits)
            {
                for (let value of this.euchreFaceValues)
                    {
                        deck.push(new Card(suit, value));
                    }
            }
        return deck;
    }

 }