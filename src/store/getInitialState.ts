import { getRandomEmojiPairs } from "../emoji";
import { size } from "../size";
import type { State } from "./State";

const cardCount = 16;
const [width, height] = size(cardCount);

const generateCards = (size: number): State["cards"] =>
  getRandomEmojiPairs(size).map((emoji) => ({ emoji }));

const buildCards = (state: State): State => ({
  ...state,
  cards: generateCards(state.width * state.height),
});

export const getInitialState = (): State =>
  buildCards({
    width,
    height,
    flipped: [],
    matched: [],
    cards: [],
    attempts: 0,
  });
