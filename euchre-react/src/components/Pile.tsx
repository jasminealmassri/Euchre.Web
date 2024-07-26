import { useEuchreSelector } from "../state/hooks";
import { selectHighestCard } from "../state/selectors/euchre";
import { EuchreRank, Pile, PlayingCardSuit } from "../lib/euchre";
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
