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
  isTablePile?: boolean;
}

const PileViewer = ({ onClick, pile, className, isTablePile = false }: Props) => {

  const tablePileClasses : string[] = ['player-1-card', 'player-2-card', 'player-3-card', 'player-4-card'];
  
  return (
    <>
    {!isTablePile && <div className={className}>
      {pile.map((card, index) => (
        <React.Fragment
          key={index}
        >
          {Card({ suit: card.suit, rank: card.rank, index, onClick })}
        </React.Fragment>
      ))}
    </div> }
    {isTablePile && <div className={className}>
      {pile.map((card, index) => (
        <div className={tablePileClasses[index]}
          key={index}
        >
          {Card({ suit: card.suit, rank: card.rank, index, onClick })}
        </div>
      ))}
    </div> }
    </>
  );
};

export default PileViewer;
