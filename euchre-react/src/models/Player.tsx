import { Card } from "./Card";
import { Hand } from "./Hand";

export class Player {

    hand: Hand;
    score: number; 

    constructor(hand : Hand = new Hand(), score : number = 0) {
        this.hand = hand;
        this.score = score;
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