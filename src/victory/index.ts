import { State } from "../store/State";

export const isVictory = (state: State) =>
  state.matched.length * 2 === state.cards.length;
