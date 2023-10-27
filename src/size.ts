/**
 * Find nice width and height of grid for number of cards.
 */
export const size = (n: number): [number, number] => {
  if (n === 2) {
    return [2, 1];
  }
  let w = Math.ceil(Math.sqrt(n));
  for (; w < n / 2; w++) {
    if (n % w === 0) {
      return [w, n / w];
    }
  }
  return [n / 2, 2];
};
