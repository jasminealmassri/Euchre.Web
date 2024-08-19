import { createListenerMiddleware } from "@reduxjs/toolkit";
import { scoreRound, scoreTrick, transitionToPhase } from "../reducers/euchre";
import { RootState } from "../store";
import { Phase } from "../../lib/euchre";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: scoreTrick,
  effect: (_, listenerApi) => {
    console.log("Time to score the trick!");

    listenerApi.cancelActiveListeners();
  },
});

listenerMiddleware.startListening({
  actionCreator: scoreRound,
  effect: (_, listenerApi) => {
    const { euchre } = listenerApi.getState() as RootState;

    if (euchre.team1Score >= 10 || euchre.team2Score >= 10) {
      listenerApi.dispatch(transitionToPhase(Phase.END_OF_GAME));
    } else {
      listenerApi.dispatch(transitionToPhase(Phase.DEALING));
    }

    listenerApi.cancelActiveListeners();
  },
});

// listenerMiddleware.startListening({
//   actionCreator: nextPlayer,
//   effect: (_, listenerApi) => {
//     const { euchre } = listenerApi.getState() as RootState;
//     const player = euchre.players[euchre.currentPlayer];
//     const hand = euchre.piles[player.hand];

//     if (player.type === "computer") {
//       const canBid = selectCanBid(euchre.currentPlayer)(euchre);
//       //const canDeal = useEuchreSelector(selectCanDeal(euchre.currentPlayer)(euchre));
//       const canPlay = selectCanPlay(euchre.currentPlayer)(euchre);
//       const mustDeclare = selectMustDeclare(euchre.currentPlayer)(euchre);
//       const mustDiscard = selectMustDiscard(euchre.currentPlayer)(euchre);
//       if (canPlay) {
//         console.log(`${player.hand} turn to play`);
//         listenerApi.dispatch(
//           playCard(
//             euchre.currentPlayer,
//             pickCardToPlay(hand, euchre.leadingSuit)
//           )
//         );
//       }
//       if (canBid) {
//         console.log(`${player.hand} turn to bid`);
//         Math.floor(Math.random() * 2) === 1
//           ? listenerApi.dispatch(pass)
//           : listenerApi.dispatch(orderUp(euchre.currentPlayer));
//       }
//       if (mustDeclare) {
//         console.log(`${player.hand} turn to declare`);
//         Math.floor(Math.random() * 2) === 1
//           ? listenerApi.dispatch(declare())
//           : listenerApi.dispatch(declare());
//       }
//       if (mustDiscard) {
//         console.log(`${player.hand} turn to discard`);
//         listenerApi.dispatch(discard(1, player.hand));
//       }
//     }

//     listenerApi.cancelActiveListeners();
//   },
// });

export default listenerMiddleware;
