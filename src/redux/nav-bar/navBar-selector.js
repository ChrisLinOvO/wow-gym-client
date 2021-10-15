import { createSelector } from "reselect";

const navBarSelect = (state) => state.navBar;

export const navChooseSelect = createSelector(
  [navBarSelect],
  (navBar) => navBar.navChoose
);

export const navLinkSelect = createSelector(
  [navBarSelect],
  (navBar) => navBar.navLink
);
