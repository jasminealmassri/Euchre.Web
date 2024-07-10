import { Card } from "../../models/Card";
import { Suit } from "../../models/Suit";

export const nextWrapIndex = (currIndex : number, end : number) => {
    return (currIndex + 1) % end;
} 

export const getOffsuit = (suit : Suit) : Suit => {
    switch(suit) {
        case Suit.Spades:
            return Suit.Clubs; 
        case Suit.Clubs:
            return Suit.Spades; 
        case Suit.Hearts:
            return Suit.Diamonds;
        case Suit.Diamonds:
            return Suit.Hearts;
    }
}

// gives top 14 cards in order based on the leading suit being evaluated and what trump is
export const getRankedCards = (trump : Suit, leadingSuit : Suit) : Card[] => {
    
    let cardRanks : Card[] = [];
    
    cardRanks.push(new Card('J', trump));
    cardRanks.push(new Card('J', getOffsuit(trump)));
    cardRanks.push(new Card('A', trump));
    cardRanks.push(new Card('K', trump));
    cardRanks.push(new Card('Q', trump));
    cardRanks.push(new Card('10', trump));
    cardRanks.push(new Card('9', trump));
    cardRanks.push(new Card('A', leadingSuit));
    cardRanks.push(new Card('K', leadingSuit));
    cardRanks.push(new Card('Q', leadingSuit));
    cardRanks.push(new Card('J', leadingSuit));
    cardRanks.push(new Card('10', leadingSuit));
    cardRanks.push(new Card('9', leadingSuit));
    
    return cardRanks;
} 