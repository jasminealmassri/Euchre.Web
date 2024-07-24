import { EuchreRank, EuchreSuit } from "../lib/euchre.interface";
import { PlayingCardSuit, suitToColor } from "../lib/playing-card.interface";

interface CardProps {
  suit: EuchreSuit;
  rank: EuchreRank;
  index: number;
  onClick?: (index: number) => void;
}

const Card = ({ suit, rank, index, onClick }: CardProps) => {
  const suitToSymbol = (suit: EuchreSuit) => {
    switch (suit) {
      case PlayingCardSuit.CLUBS:
        return "♣";
      case PlayingCardSuit.DIAMONDS:
        return "♦";
      case PlayingCardSuit.HEARTS:
        return "♥";
      case PlayingCardSuit.SPADES:
        return "♠";
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "0.25em",
        color: suitToColor(suit),
        cursor: "pointer",
        maxWidth: "2.5em",
      }}
      onClick={() => onClick && onClick(index)}
    >
      {rank} {suitToSymbol(suit)}
    </div>
  );
};
export default Card;
