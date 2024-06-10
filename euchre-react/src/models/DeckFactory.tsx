import { Card } from "./Card";

export class DeckFactory {
    static suits : string[] = ["diamonds", "clubs", "spades", "hearts" ];
    static faceValues : string[] = ["1", "2", "3", "4", "5", "6", "7" , "8", "9", "10", "J", "Q", "K", "A"];
    static euchreFaceValues: string[] = ["9", "10", "J", "Q", "K", "A"];


    constructor() {
       
    }

    public static makeDeck() : Card[] {

        let deck : Card[] = [];

        for (let suit of this.suits)
            {
                for (let value of this.faceValues)
                    {
                        deck.push(new Card(value, suit));
                    }
            }
        return deck;
    }

    public static makeEuchreDeck() : Card[] {

        let deck : Card[] = [];

        for (let suit of this.suits)
            {
                for (let value of this.euchreFaceValues)
                    {
                        deck.push(new Card(value, suit));
                    }
            }
        return deck;
    }

 }