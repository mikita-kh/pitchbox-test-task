export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const delay =
  <T = any>(callback: (...args: unknown[]) => T) =>
  (...args: unknown[]) =>
    new Promise(resolve => setTimeout(() => resolve(callback(...args)), getRandomNumber(0, 1e3)))
