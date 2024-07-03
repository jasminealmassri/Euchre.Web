import { Card } from "./Card";
import { Hand } from "./Hand";

export class Computer {

    hand: Hand;

    constructor(hand : Hand) {
        this.hand = hand;
    }

    playCard(index: number) : Card {
        return this.hand.playCard(index);
    }

    pickItUp() : boolean {
        return true;
    }
}