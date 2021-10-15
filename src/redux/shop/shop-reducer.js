import { shopActionTypes } from "./shop-action-type";
import { filterPrice, filterType } from "./shop-utils";

const INITIAL_STATE = {
  collections: [],
  shopPageCollections: [],
  isFetching: false,
  shopItemDetail: [],
  errorMessage: undefined,
  preCollections: [],
  filterTag: "選擇篩選",
  filterPriceTag: "選擇篩選",
  shopUrl: {
    food: ["cookie", "portein"],
    men: ["shirt", "pants"],
    women: ["clothes", "pants"],
  },
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.SHOP_PAGE_START:
      return {
        ...state,
        isFetching: true,
      };
    case shopActionTypes.SHOP_PAGE_SUCCESS:
      return {
        ...state,
        shopPageCollections: action.payload,
        isFetching: false,
      };
    case shopActionTypes.SHOP_PAGE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    case shopActionTypes.SHOP_ITEM_DETAIL:
      return {
        ...state,
        shopItemDetail: action.payload,
      };
    case shopActionTypes.SHOP_FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case shopActionTypes.SHOP_FETCH_SUCCESS:
      return {
        ...state,
        collections: action.payload,
        isFetching: false,
      };
    case shopActionTypes.SHOP_FETCH_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    case shopActionTypes.SHOP_ITEM_START:
      return {
        ...state,
        isFetching: true,
      };
    case shopActionTypes.SHOP_ITEM_SUCCESS:
      return {
        ...state,
        shopItemDetail: action.payload,
        isFetching: false,
      };
    case shopActionTypes.SHOP_PRICE_FILTER:
      return {
        ...state,
        collections: [...filterPrice(state.collections, action.payload)],
        filterPriceTag: action.payload,
      };
    case shopActionTypes.SHOP_ITEMTYPE_FILTER:
      return {
        ...state,
        collections: filterType(state.collections, action.payload),
        preCollections: [...state.collections],
      };
    case shopActionTypes.SHOP_FILTER_TAG:
      return {
        ...state,
        filterTag: action.payload,
        filterPriceTag: "選擇篩選",
      };
    case shopActionTypes.SHOP_CLEAN_FILTER:
      return {
        ...state,
        filterTag: state.filterTag.filter((tag) => tag !== action.payload),
        collections: [...state.preCollections],
        preCollections: [],
      };
    default:
      return state;
  }
};

export default shopReducer;
