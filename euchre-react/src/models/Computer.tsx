//import { getOffsuit, getRankedCards } from "../functions/Euchre/Utility";
import { Card } from "./Card";
import { Hand } from "./Hand";

export class Computer {

    hand: Hand;
    score: number; 

    constructor(hand : Hand = new Hand(), score : number = 0) {
        this.hand = hand;
        this.score = score;
    }

    // calculateWinProbCard(card : Card, trump : Suit) : number {

    //     const TOTAL_NUM_CARDS = 24;
        
    //     let num_cards_that_can_beat_this_card = 0;
    //     const cardRanks = getRankedCards(trump, card.suit);
    //     let card_rank_index = 0;

    //     for (let i = 0; i < cardRanks.length; i++) {
    //         if (cardRanks[i] == card) {
    //             num_cards_that_can_beat_this_card += i;
    //             card_rank_index = i;
    //             break;
    //         }
    //     }

    //     const ceiling = num_cards_that_can_beat_this_card;

    //     // subtract higher rank cards already in your hand
    //     for (let i = 0; i < hand.cards.length; i++) {
    //         for (let j = 0; j < ceiling; j++) {
    //             if (hand.cards[i] == cardRanks[j])
    //             {
    //                 num_cards_that_can_beat_this_card -= 1;
    //             }
    //         }
    //     }

    //     const left_bower : Card = new Card('J', getOffsuit(trump));
    //     if (card.suit !== trump && card != left_bower) {
    //         return ((12 - (card_rank_index - 1)) / 12.0);
    //     }
    //     return TOTAL_NUM_CARDS - num_cards_that_can_beat_this_card / TOTAL_NUM_CARDS;
    // }

    playCard(index: number) : Card {
        return this.hand.playCard(index);
    }

    pickItUp() : boolean {
        return false;
    }
}