import { EuchreRank, Pile, PlayingCardSuit } from "../lib/euchre";
import Card from "./Card";
import React from "react";
import "./TrickComponent.css";
import { useEuchreSelector } from "../state/hooks";
import { selectHighestCard } from "../state/selectors/euchre";
import "./CardComponent.css";

interface Props {
  pile: Pile<PlayingCardSuit, EuchreRank>;
  showHighestCard?: boolean;
  stacked?: boolean;
  onClick?: (index: number) => void;
  className?: string;
  isTablePile?: boolean;
  cardHoverEffect?: boolean;
}

const PileViewer = ({
  onClick,
  pile,
  className,
  isTablePile = false,
  cardHoverEffect = false,
}: Props) => {
  const tablePositionsPlaying = useEuchreSelector(
    (state) => state.tablePositionsPlaying
  );
  const winningCardIndex = useEuchreSelector(selectHighestCard(pile));

  const tablePileClasses: string[] = [
    "player-1-card",
    "player-2-card",
    "player-3-card",
    "player-4-card",
  ];

  return (
    <>
      {!isTablePile && (
        <div className={className}>
          {pile.map((card, index) => (
            <React.Fragment key={index}>
              {Card({
                className: `${cardHoverEffect ? "playableCards" : ""}`,
                suit: card.suit,
                rank: card.rank,
                index,
                onClick,
              })}
            </React.Fragment>
          ))}
        </div>
      )}
      {isTablePile && (
        <div className={className}>
          {pile.map((card, index) => (
            <div
              className={tablePileClasses[tablePositionsPlaying[index]]}
              key={index}
            >
              {Card({ suit: card.suit, rank: card.rank, index, onClick })}
              <div
                className={` ${
                  tablePileClasses[tablePositionsPlaying[index]]
                } ${winningCardIndex === index ? `leadingCard` : ""}`}
              ></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PileViewer;
