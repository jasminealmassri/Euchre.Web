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

export const range = (length: number, start: number = 0): number[] => {
  return Array.from({ length }, (_, i) => i + start);
};
