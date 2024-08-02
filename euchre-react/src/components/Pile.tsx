import { EuchreRank, Pile, PlayingCardSuit } from "../lib/euchre";
import Card from "./Card";
import React from "react";
import './TrickComponent.css'

interface Props {
  pile: Pile<PlayingCardSuit, EuchreRank>;
  showHighestCard?: boolean;
  stacked?: boolean;
  onClick?: (index: number) => void;
  className?: string;
}

const PileViewer = ({ onClick, pile, className }: Props) => {

  return (
    <div className={className}>
      {pile.map((card, index) => (
        <React.Fragment
          key={index}
        >
          {Card({ suit: card.suit, rank: card.rank, index, onClick })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PileViewer;
