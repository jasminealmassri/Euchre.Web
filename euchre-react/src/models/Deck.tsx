import { Card } from "./Card";


export class Deck {
    cards : Card[];

    constructor(cards : Card[] = []) {
        this.cards = cards;
    }

    public dealCards(num : number, cards : Card[]) {
        const dealtCards =  this.cards.splice(0, num);
        cards.push(...dealtCards);
    }
}