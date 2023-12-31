import type { CardIndex, CardInfo } from "../card/types";
import type { Emoji } from "../emoji/types";

export type State = {
  mode: "easy" | "normal";
  width: number;
  height: number;
  flipped: CardIndex[];
  matched: Emoji[];
  cards: CardInfo[];
  attempts: number;
};
