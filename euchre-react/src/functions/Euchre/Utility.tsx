export const nextWrapIndex = (currIndex : number, end : number) => {
    return end == currIndex? 0 : currIndex + 1;
} 