import { Card } from "./Card";

export class Hand {
    cards: Card[];

    constructor(cards : Card[] = []) {
        this.cards = cards;
    }

    playCard(index : number) : Card {
        // removes an element at the given index and returns it
        return this.cards.splice(index, 1)[0];
    }
}