import { EuchreGameState } from ".";

export const debugState: EuchreGameState = {
  currentPlayer: 3,
  dealer: 1,
  leadingPlayer: 2,
  team1Score: 0,
  team2Score: 2,
  trump: "hearts",
  trumpCandidates: ["diamonds", "spades", "clubs", "hearts"],
  leadingSuit: "clubs",
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
      hand: "player1",
    },
    {
      name: "Player 2",
      tricks: 0,
      hand: "player2",
    },
    {
      name: "Player 3",
      tricks: 4,
      hand: "player3",
    },
    {
      name: "Player 4",
      tricks: 0,
      hand: "player4",
    },
  ],
} as EuchreGameState;
