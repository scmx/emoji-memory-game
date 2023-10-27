import { ReactNode, Reducer, useReducer } from "react";
import { CardIndex } from "../card/types";
import type { Action } from "./Action";
import { DispatchContext, StateContext } from "./Context";
import type { State } from "./State";
import { getInitialState } from "./getInitialState";

type AppReducer = Reducer<State, Action>;

const appReducer: AppReducer = (state, action) => {
  switch (action.type) {
    case "RESET": {
      return getInitialState();
    }
    case "FLIP": {
      const cardIndex: CardIndex = action.payload;
      const attempts = state.attempts + 1;
      console.log(
        state.width * state.height,
        attempts,
        state.matched.length * 2,
      );
      const nextState = { ...state, attempts };
      if (state.flipped.length === 0) {
        return { ...nextState, flipped: [cardIndex] };
      }
      const prevIndex = state.flipped[state.flipped.length - 1];
      if (state.cards[cardIndex].emoji !== state.cards[prevIndex].emoji) {
        return { ...nextState, flipped: [prevIndex, cardIndex] };
      }
      return {
        ...nextState,
        flipped: [],
        matched: [...state.matched, state.cards[cardIndex].emoji],
      };
    }
    default: {
      return state;
    }
  }
};

type Middleware = (reducer: AppReducer) => AppReducer;
type FSA = { type: string; payload?: unknown; meta?: Record<string, unknown> };

const loggerMiddleware: Middleware = (reducer) => (state, action) => {
  console.groupCollapsed(action.type, (action as FSA).payload);
  console.log("before", state);
  const result: State = reducer(state, action);
  console.log("after", result);
  console.groupEnd();
  return result;
};

const rootReducer = loggerMiddleware(appReducer);

export function Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, getInitialState());
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
