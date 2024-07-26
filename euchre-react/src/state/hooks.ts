import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import { EuchreGameState } from "../lib/euchre";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useEuchreSelector: TypedUseSelectorHook<EuchreGameState> = (
  selector
) => useSelector((state: RootState) => selector(state.euchre));
