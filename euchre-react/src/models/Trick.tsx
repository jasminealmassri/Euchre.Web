import { Card } from "./Card";

export class Trick {
    cards : Card[];

    constructor(cards : Card[] = []) {
        this.cards = cards;
    }

}