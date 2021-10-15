import { navBarActionTypes } from "./navBar-action-type";

export const navBarSelect = (selected) => ({
  type: navBarActionTypes.NAV_BAR_SELECT,
  payload: selected,
});
