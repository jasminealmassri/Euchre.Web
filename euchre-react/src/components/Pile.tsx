import { EuchreRank } from "../lib/euchre.interface";
import { Pile, PlayingCardSuit } from "../lib/playing-card.interface";
import Card from "./Card";

interface Props {
  pile: Pile<PlayingCardSuit, EuchreRank>;
  stacked?: boolean;
  onClick?: (index: number) => void;
}

const PileViewer = ({ onClick, pile }: Props) => {
  const style = {
    display: "flex",
    gap: "0.25em",
  };

  return (
    <div style={style}>
      {pile.map((card, index) =>
        Card({ suit: card.suit, rank: card.rank, index, onClick })
      )}
    </div>
  );
};

export default PileViewer;
