import { Card } from "./Card";
import { Hand } from "./Hand";

export class Player {

    hand: Hand;

    constructor(hand : Hand = new Hand()) {
        this.hand = hand;
    }

    playCard(index: number) : Card {
        return this.hand.playCard(index);
    }

    // pickItUp() : boolean {
    //     return false;
    // }

    exchangeCard(index : number, card : Card) : Card {
        const discard = this.hand.cards[index];
        this.hand.cards[index] = card;
        return discard; 
    }
}