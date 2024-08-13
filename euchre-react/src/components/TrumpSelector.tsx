import { useEuchreSelector } from "../state/hooks";
import {
  PlayingCardSuit,
  suitToColor,
} from "../lib/playing-card/playing-card.interface";
import "./TableComponent.css";
interface Props {
  onClick?: (suit: PlayingCardSuit) => void;
}

const TrumpSelector = ({ onClick }: Props) => {
  const suits = { clubs: "♣", diamonds: "♦", hearts: "♥", spades: "♠" };
  const candidates = useEuchreSelector((state) => state.trumpCandidates);

  return (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      {candidates.map((suit) => (
        <div
          key={suit}
          style={{
            color: suitToColor(suit),
          }}
          className="trumpSuits"
          onClick={() => onClick && onClick(suit)}
        >
          {suits[suit]}
        </div>
      ))}
    </div>
  );
};
export default TrumpSelector;
