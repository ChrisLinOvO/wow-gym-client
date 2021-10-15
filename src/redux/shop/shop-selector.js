import { createSelector } from "reselect";

const shopSelect = (state) => state.shop;

export const shopUrlSelect = createSelector(
  [shopSelect],
  (shop) => shop.shopUrl
);

export const shopIsFetchingSelect = createSelector(
  [shopSelect],
  (shop) => shop.isFetching
);

export const shopCollectionsSelect = createSelector(
  [shopSelect],
  (shop) => shop.collections
);

export const shopItemDetailSelect = createSelector(
  [shopSelect],
  (shop) => shop.shopItemDetail
);

export const shopFilterTagSelect = createSelector(
  [shopSelect],
  (shop) => shop.filterTag
);

export const shopFilterPriceTagSelect = createSelector(
  [shopSelect],
  (shop) => shop.filterPriceTag
);

export const shopPageCollectionsSelect = createSelector(
  [shopSelect],
  (shop) => shop.shopPageCollections
);
