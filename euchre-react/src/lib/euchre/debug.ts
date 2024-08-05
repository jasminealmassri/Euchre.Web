import { EuchreGameState } from ".";

export const debugState: EuchreGameState = {
  currentPlayer: 3,
  leadingPlayer: 2,
  team1Score: 0,
  team2Score: 2,
  trump: "hearts",
  trumpCandidates: ["diamonds", "spades", "clubs", "hearts"],
  leadingSuit: "clubs",
  dealer: 1,
  phase: "playingTricks",
  piles: {
    deck: [
      {
        suit: "diamonds",
        rank: "A",
        faceUp: false,
      },
      {
        suit: "diamonds",
        rank: "J",
        faceUp: false,
      },
      {
        suit: "hearts",
        rank: "9",
        faceUp: false,
      },
    ],
    discard: [
      {
        suit: "hearts",
        rank: "K",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "Q",
        faceUp: true,
      },
      {
        suit: "diamonds",
        rank: "K",
        faceUp: true,
      },
      {
        suit: "diamonds",
        rank: "Q",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "A",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "9",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "J",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "Q",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "J",
        faceUp: true,
      },
      {
        suit: "spades",
        rank: "10",
        faceUp: true,
      },
      {
        suit: "diamonds",
        rank: "10",
        faceUp: true,
      },
      {
        suit: "hearts",
        rank: "10",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "A",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "J",
        faceUp: true,
      },
      {
        suit: "diamonds",
        rank: "9",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "Q",
        faceUp: true,
      },
      {
        suit: "clubs",
        rank: "9",
        faceUp: false,
      },
    ],
    talon: [],
    table: [
      {
        suit: "clubs",
        rank: "10",
        faceUp: true,
      },
    ],
    player1: [
      {
        suit: "spades",
        rank: "A",
        faceUp: false,
      },
    ],
    player2: [
      {
        suit: "clubs",
        rank: "K",
        faceUp: false,
      },
    ],
    player3: [],
    player4: [
      {
        suit: "spades",
        rank: "K",
        faceUp: true,
      },
    ],
  },
  players: [
    {
      name: "Player 1",
      tricks: 0,
      role: "d",
      hand: "player1",
      sittingOut: false,
      tablePosition: 1,
      type: "human",
    },
    {
      name: "Player 2",
      tricks: 0,
      role: "M",
      hand: "player2",
      sittingOut: false,
      tablePosition: 2,
      type: "computer",
    },
    {
      name: "Player 3",
      tricks: 4,
      role: "d",
      hand: "player3",
      sittingOut: true,
      tablePosition: 3,
      type: "computer",
    },
    {
      name: "Player 4",
      tricks: 0,
      role: "m",
      hand: "player4",
      sittingOut: false,
      tablePosition: 4,
      type: "computer",
    },
  ],
  tablePositionsPlaying: [],
} as EuchreGameState;
