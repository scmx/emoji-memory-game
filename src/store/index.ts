import { useContext } from "react";
import { DispatchContext, StateContext } from "./Context";
import type { State } from "./State";

export const useDispatch = () => useContext(DispatchContext);

type Selector<T> = (state: State) => T;

export const useSelector = <T>(selector: Selector<T>) =>
  selector(useContext(StateContext));
