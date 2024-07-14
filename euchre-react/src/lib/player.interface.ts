import { Card } from "./card.interface";

export interface Player<T> {
  score: number;
  hand: Card<T>[];
}
