import { EuchreGameState } from ".";

export const testState: EuchreGameState = {
  currentPlayer: 0,
  leadingPlayer: 1,
  team1Score: 0,
  team2Score: 0,
  trump: "clubs",
  trumpCandidates: ["diamonds", "spades", "clubs", "hearts"],
  leadingSuit: "hearts",
  dealer: 0,
  phase: "playingTricks",
  piles: {
    deck: [
      {
        suit: "clubs",
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
        rank: "J",
        faceUp: false,
      },
    ],
    discard: [
      {
        suit: "hearts",
        rank: "9",
        faceUp: false,
      },
    ],
    talon: [],
    table: [
      {
        suit: "hearts",
        rank: "A",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "10",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "Q",
        faceUp: true,
      },
    ],
    player1: [
      {
        suit: "diamonds",
        rank: "10",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "10",
        faceUp: false,
      },
    ],
    player2: [
      {
        suit: "diamonds",
        rank: "Q",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "9",
        faceUp: false,
      },
    ],
    player3: [
      {
        suit: "diamonds",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "Q",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "K",
        faceUp: false,
      },
      {
        suit: "clubs",
        rank: "A",
        faceUp: false,
      },
    ],
    player4: [
      {
        suit: "clubs",
        rank: "10",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "9",
        faceUp: false,
      },
      {
        suit: "spades",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "9",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "Q",
        faceUp: false,
      },
    ],
  },
  players: [
    {
      hand: "player1",
      name: "Player 1",
      role: "d",
      sittingOut: false,
      tablePosition: 1,
      type: "human",
      tricks: 0,
    },
    {
      hand: "player2",
      name: "Player 2",
      role: "M",
      sittingOut: false,
      tablePosition: 2,
      type: "computer",
      tricks: 0,
    },
    {
      hand: "player3",
      name: "Player 3",
      role: "d",
      sittingOut: false,
      tablePosition: 3,
      type: "computer",
      tricks: 0,
    },
    {
      hand: "player4",
      name: "Player 4",
      role: "m",
      sittingOut: true,
      tablePosition: 4,
      type: "computer",
      tricks: 0,
    },
  ],
  tablePositionsPlaying: [],
} as EuchreGameState;
