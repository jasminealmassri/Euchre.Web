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

    public dealCard() : Card {
        const cards = this.cards.splice(0, 1);
        return cards[0];
    }

    public shuffleDeck() {
        const shuffledDeck = this.cards.slice();
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]
        }
        this.cards = shuffledDeck;
    }
}