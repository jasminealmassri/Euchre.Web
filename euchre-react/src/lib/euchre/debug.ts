import { EuchreGameState } from ".";

export const debugState: EuchreGameState = {
  currentPlayer: 3,
  dealer: 0,
  leadingPlayer: 2,
  team1Score: 0,
  team2Score: 1,
  trump: "hearts",
  trumpCandidates: ["diamonds", "spades", "clubs", "hearts"],
  leadingSuit: "hearts",
  phase: "playingTricks",
  piles: {
    deck: [
      {
        suit: "clubs",
        rank: "Q",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "Q",
        faceUp: false,
      },
    ],
    discard: [
      {
        suit: "spades",
        rank: "A",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "Q",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "9",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "9",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "10",
        faceUp: false,
      },
    ],
    talon: [],
    table: [
      {
        suit: "diamonds",
        rank: "J",
        faceUp: true,
      },
    ],
    player1: [
      {
        suit: "hearts",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "10",
        faceUp: false,
      },
    ],
    player2: [
      {
        suit: "spades",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "9",
        faceUp: false,
      },
    ],
    player3: [
      {
        suit: "diamonds",
        rank: "10",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "9",
        faceUp: false,
      },
    ],
    player4: [
      {
        suit: "spades",
        rank: "Q",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "10",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "K",
        faceUp: false,
      },
    ],
  },
  players: [
    {
      hand: "player1",
      name: "You",
      tablePosition: 0,
      type: "human",
      sittingOut: false,
      role: "M",
      tricks: 0,
    },
    {
      hand: "player2",
      name: "Player 2",
      tablePosition: 1,
      type: "computer",
      role: "d",
      sittingOut: false,
      tricks: 0,
    },
    {
      hand: "player3",
      name: "Player 3",
      tablePosition: 2,
      type: "computer",
      role: "m",
      sittingOut: false,
      tricks: 1,
    },
    {
      hand: "player4",
      name: "Player 4",
      tablePosition: 3,
      type: "computer",
      role: "d",
      sittingOut: false,
      tricks: 0,
    },
  ],
  tablePositionsPlaying: [2, 3, 0, 1],
} as EuchreGameState;
