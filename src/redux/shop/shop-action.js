import { shopActionTypes } from "./shop-action-type";

export const shopItemDetail = (item) => ({
  type: shopActionTypes.SHOP_ITEM_DETAIL,
  payload: item,
});

export const shopFetchStart = (urlParams = undefined, typeUrl = undefined) => ({
  type: shopActionTypes.SHOP_FETCH_START,
  payload: urlParams,
  typeUrl,
});

export const shopFetchSuccess = (collectionItems) => ({
  type: shopActionTypes.SHOP_FETCH_SUCCESS,
  payload: collectionItems,
});

export const shopFetchFailure = (err) => ({
  type: shopActionTypes.SHOP_FETCH_FAILURE,
  payload: err,
});

export const shopItemStart = (itemId) => ({
  type: shopActionTypes.SHOP_ITEM_START,
  payload: itemId,
});

export const shopItemSuccess = (shopItem) => ({
  type: shopActionTypes.SHOP_ITEM_SUCCESS,
  payload: shopItem,
});

export const shopFilterPrice = (price) => ({
  type: shopActionTypes.SHOP_PRICE_FILTER,
  payload: price,
});

export const shopFilterItemType = (itemType) => ({
  type: shopActionTypes.SHOP_ITEMTYPE_FILTER,
  payload: itemType,
});

export const shopShowFilterTag = (tag) => ({
  type: shopActionTypes.SHOP_FILTER_TAG,
  payload: tag,
});

export const shopCleanFilter = (tag) => ({
  type: shopActionTypes.SHOP_CLEAN_FILTER,
  payload: tag,
});

export const shopPageStart = () => ({
  type: shopActionTypes.SHOP_PAGE_START,
});

export const shopPageSuccess = (shopPageItem) => ({
  type: shopActionTypes.SHOP_PAGE_SUCCESS,
  payload: shopPageItem,
});

export const shopPageFailure = (err) => ({
  type: shopActionTypes.SHOP_PAGE_FAILURE,
  payload: err,
});
