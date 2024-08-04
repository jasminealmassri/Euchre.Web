import { expect, test } from "vitest";

import { testState } from "./test-state";
import { getWinningPlayer } from ".";

test("correctly map winning card to player that played it", () => {
  const winningCardIndex = 2;

  const winningPlayerIndex = getWinningPlayer(testState, winningCardIndex);

  expect(winningPlayerIndex).toBe(0);
  expect(testState.players[3].sittingOut).toBe(true);
  expect(testState.players.length).toBe(4);
});
