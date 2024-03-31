export const getCurrentPlayerIndex = (turn: number, playersCount: number) =>
  turn % playersCount ? (turn % playersCount) - 1 : 0;
