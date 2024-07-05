export const nextWrapIndex = (currIndex : number, end : number) => {
    return end == currIndex - 1 ? 0 : currIndex + 1;
} 