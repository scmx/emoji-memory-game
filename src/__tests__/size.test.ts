import { size } from "../size";

describe("size", () => {
  const testSize = ([a, b]: [number, number], n: number) => {
    test(`detects ${a}x${b} for ${n}`, () => {
      expect(size(n)).toEqual([a, b]);
    });
  };

  testSize([6, 4], 24);
  testSize([11, 2], 22);
  testSize([5, 4], 20);
  testSize([6, 3], 18);
  testSize([4, 4], 16);
  testSize([7, 2], 14);
  testSize([4, 3], 12);
  testSize([5, 2], 10);
  testSize([4, 2], 8);
  testSize([3, 2], 6);
  testSize([2, 2], 4);
  testSize([2, 1], 2);
});
