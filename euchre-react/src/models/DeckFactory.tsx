import { Card } from "./Card";
import { Suit } from "./Suit";

export class DeckFactory {
    static suits : Suit[] = [Suit.Diamonds, Suit.Clubs, Suit.Hearts, Suit.Spades];
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