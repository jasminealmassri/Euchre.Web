import { Hand } from "../models/Hand";

export interface Player {
    score: number;
    hand: Hand;
  }