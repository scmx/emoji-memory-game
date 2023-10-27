import { createContext, Dispatch } from "react";
import type { Action } from "./Action";
import { getInitialState } from "./getInitialState";
import type { State } from "./State";

export const StateContext = createContext<State>(getInitialState());
export const DispatchContext = createContext<Dispatch<Action>>(() => null);
