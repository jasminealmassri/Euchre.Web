import { expect, test } from "vitest";

import { getLastTurnIndex } from ".";

const numberOfPlayers = 4;

test("last turn index calculations", () => {
  expect(getLastTurnIndex(0, numberOfPlayers)).toBe(3);
  expect(getLastTurnIndex(1, numberOfPlayers)).toBe(0);
  expect(getLastTurnIndex(2, numberOfPlayers)).toBe(1);
  expect(getLastTurnIndex(3, numberOfPlayers)).toBe(2);
});
