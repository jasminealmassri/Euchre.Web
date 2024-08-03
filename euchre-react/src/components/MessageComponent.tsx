import { useContext } from "react";
import "./MessageComponent.css";
import { GameContext } from "./EuchreComponent";
import { useEuchreSelector } from "../state/hooks";
import { Phase } from "../state";

const MessageComponent = () => {
  const phase = useEuchreSelector((state) => state.phase);
  const currentPlayer = useEuchreSelector((state) => state.currentPlayer);
  const dealer = useEuchreSelector((state) => state.dealer);
  const leadingPlayer = useEuchreSelector((state) => state.leadingPlayer);
  //const game = useContext(GameContext);

  let message: string = "";
  switch (phase) {
    case Phase.DEALING: {
      message = "Dealing cards";
      break;
    }
    case Phase.BIDDING: {
      message = "Bidding for trump";
      break;
    }
    case Phase.DECLARING: {
      message = "Declaring";
      break;
    }
    case Phase.DISCARDING: {
      message = "Dealer is discarding";
      break;
    }
    case Phase.CALLING_TRUMP: {
      message = "Deciding trump";
      break;
    }
    case Phase.PLAYING_TRICKS: {
      message = `Player ${currentPlayer + 1}'s turn`;
      break;
    }
    case Phase.ROUND_SCORING: {
      message = "Starting new round";
      break;
    }
    case Phase.END_OF_GAME: {
      message = "Game over";
      break;
    }
    case Phase.TRICK_SCORING: {
      message = `Player ${leadingPlayer + 1} won`;
      break;
    }
  }

  return (
    <>
      <div className="message">{message}</div>
    </>
  );
};

export default MessageComponent;
