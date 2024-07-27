import { nextPlayer } from "../../reducers/euchre";
import { AppThunk } from "../../store";

export const passOnTrump = (): AppThunk => (dispatch) => {
  dispatch(nextPlayer());
};
