import { useEuchreSelector } from "../state/hooks";
import {
  PlayingCardSuit,
  suitToColor,
} from "../lib/playing-card/playing-card.interface";

interface Props {
  onClick?: (suit: PlayingCardSuit) => void;
}

const TrumpSelector = ({ onClick }: Props) => {
  const suits = { clubs: "♣", diamonds: "♦", hearts: "♥", spades: "♠" };
  const candidates = useEuchreSelector((state) => state.trumpCandidates);

  return (
    <div style={{ display: "flex" }}>
      {candidates.map((suit) => (
        <div
          key={suit}
          style={{
            border: "1px solid black",
            padding: "0.25em",
            color: suitToColor(suit),
            cursor: "pointer",
            maxWidth: "1.5em",
          }}
          onClick={() => onClick && onClick(suit)}
        >
          {suits[suit]}
        </div>
      ))}
    </div>
  );
};
export default TrumpSelector;
