import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./lib/store";
import { EuchreGameState } from "./lib/euchre.interface";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useEuchreSelector: TypedUseSelectorHook<EuchreGameState> = (
  selector
) => useSelector((state: RootState) => selector(state.euchre));
