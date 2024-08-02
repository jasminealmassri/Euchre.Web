import { useEuchreSelector } from "../state/hooks";
import { selectHighestCard } from "../state/selectors/euchre";
import { EuchreRank, Pile, PlayingCardSuit } from "../lib/euchre";
import Card from "./Card";
import CardComponent from "./CardComponent";
import React from "react";

interface Props {
  pile: Pile<PlayingCardSuit, EuchreRank>;
  showHighestCard?: boolean;
  stacked?: boolean;
  onClick?: (index: number) => void;
  className: string;
}

const PileViewer = ({ onClick, pile, showHighestCard, className }: Props) => {
  const highestCard = useEuchreSelector(selectHighestCard(pile));

  const style = {
    display: "flex",
    gap: "0.25em",
  };

  return (
    <div className={className}>
      {pile.map((card, index) => (
        <React.Fragment
          key={index}
          // style={{
          //   background: highestCard === index && showHighestCard ? "gold" : "",
          // }}
        >
          {Card({ suit: card.suit, rank: card.rank, index, onClick })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PileViewer;
