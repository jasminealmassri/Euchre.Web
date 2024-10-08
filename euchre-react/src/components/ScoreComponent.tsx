import "./ScoreComponent.css";

import Clubs from "../assets/images/Suits/Outline/Clubs2.png";
import Spades from "../assets/images/Suits/Outline/Spades2.png";
import Hearts from "../assets/images/Suits/Outline/Hearts2.png";
import Diamonds from "../assets/images/Suits/Outline/Diamonds2.png";

import { useEuchreSelector } from "../state/hooks";
import { PlayingCardSuit } from "../lib/euchre";
import { selectPlayer, selectTrumpMaker } from "../state/selectors/euchre";

const ScoreComponent = () => {
  const team1Score = useEuchreSelector((state) => state.team1Score);
  const team2Score = useEuchreSelector((state) => state.team2Score);
  const trump = useEuchreSelector((state) => state.trump);
  const player1 = useEuchreSelector(selectPlayer(0));
  const player2 = useEuchreSelector(selectPlayer(1));
  const player3 = useEuchreSelector(selectPlayer(2));
  const player4 = useEuchreSelector(selectPlayer(3));
  const trumpMaker = useEuchreSelector(selectTrumpMaker);

  const getTrumpIcon = (trump: PlayingCardSuit | null) => {
    switch (trump) {
      case PlayingCardSuit.CLUBS:
        return Clubs;
      case PlayingCardSuit.HEARTS:
        return Hearts;
      case PlayingCardSuit.DIAMONDS:
        return Diamonds;
      case PlayingCardSuit.SPADES:
        return Spades;
    }
  };

  return (
    <div className="scoreboard-container">
      <div className="total_scores">
        <div>
          {player1.name} and {player3.name}: {team1Score} points
        </div>
        <div>
          {player2.name} and {player4.name}: {team2Score} points
        </div>
      </div>
      {trump && (
        <div className="round-scoreboard">
          <div className="left_score">
            <p>Tricks won: {(player1?.tricks ?? 0) + (player3?.tricks ?? 0)}</p>
          </div>
          <div className="middle_score">
            <p>Current trump:</p>
            {trump && (
              <img src={getTrumpIcon(trump)} className="trumpAnimation"></img>
            )}
          </div>
          {trumpMaker && (
            <div className="right_score">
              <p>Trump called by {trumpMaker?.name}</p>
            </div>
          )}
          <div className="right_score">
            <p>
              Tricks lost: {(player2?.tricks ?? 0) + (player4?.tricks ?? 0)}{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreComponent;
