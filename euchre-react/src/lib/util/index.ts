export const circularArray = <T>(items: T[], startingIndex = 0) => {
  let currentIndex = startingIndex;

  return {
    current: (): T => items[currentIndex],
    next: (): T => {
      currentIndex = (currentIndex + 1) % items.length;
      return items[currentIndex];
    },
  };
};

export const getLastTurnIndex = (
  startingIndex: number,
  playerCount: number
): number => {
  return (startingIndex - 1 + playerCount) % playerCount;
};

export const nextIndex = (size: number, currIndex: number): number => {
  return (currIndex + 1) % size;
};

export const range = (length: number, start: number = 0): number[] => {
  return Array.from({ length }, (_, i) => i + start);
};
