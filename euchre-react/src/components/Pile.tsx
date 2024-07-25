import { useEuchreSelector } from "../hooks";
import { selectHighestCard } from "../lib/euchre-slice";
import { EuchreRank } from "../lib/euchre.interface";
import { Pile, PlayingCardSuit } from "../lib/playing-card.interface";
import Card from "./Card";

interface Props {
  pile: Pile<PlayingCardSuit, EuchreRank>;
  showHighestCard?: boolean;
  stacked?: boolean;
  onClick?: (index: number) => void;
}

const PileViewer = ({ onClick, pile, showHighestCard }: Props) => {
  const highestCard = useEuchreSelector(selectHighestCard(pile));

  const style = {
    display: "flex",
    gap: "0.25em",
  };

  return (
    <div style={style}>
      {pile.map((card, index) => (
        <div
          key={index}
          style={{
            background: highestCard === index && showHighestCard ? "gold" : "",
          }}
        >
          {Card({ suit: card.suit, rank: card.rank, index, onClick })}
        </div>
      ))}
    </div>
  );
};

export default PileViewer;
