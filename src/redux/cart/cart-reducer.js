import { cartActionTypes } from "./cart-action-type";
import {
  addShopItemToCart,
  removeCartItem,
  unlikeCartItem,
  ChangeFavr,
  RedeuceCartItem,
  FavCartItem,
  delFavCartItem,
} from "./cart-utils";

const INITIAL_STATE = {
  hidden: false,
  cartItems: [],
  cartFavoriteItems: {},
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TAGGLE_CART_DROPDOWN:
      return { ...state, hidden: !state.hidden };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addShopItemToCart(state.cartItems, action.payload),
      };
    case cartActionTypes.REOMOVE_ITEM:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, action.payload),
      };
    case cartActionTypes.LIKE_ITEM:
      return {
        ...state,
        cartFavoriteItems: {
          ...state.cartFavoriteItems,
          [action.payload.itemId]: action.payload,
        },
      };
    case cartActionTypes.UNLIKE_ITEM:
      return {
        ...state,
        cartFavoriteItems: unlikeCartItem(
          state.cartFavoriteItems,
          action.payload
        ),
      };
    case cartActionTypes.ADD_QUANTITY:
      return {
        ...state,
        cartItems: addShopItemToCart(
          state.cartItems,
          action.payload,
          action.quantity
        ),
      };
      case cartActionTypes.REDUCE_ITEM:
        return {
          ...state,
          cartItems: RedeuceCartItem(state.cartItems, action.payload),
        };
  
  
  
      ///還沒改完
      case cartActionTypes.CHANGEFAVR_ITEM:
        return {
          ...state,
          cartItems: ChangeFavr(state.cartItems, action.payload),
        };
  
  
      case cartActionTypes.ADDEFAVR_ITEM:
        return {
          ...state,
          cartFavoriteItems: FavCartItem(state.cartFavoriteItems, action.payload),
        };
  
  
      case cartActionTypes.delFavCartItem:
        return {
          ...state,
          cartFavoriteItems: delFavCartItem(state.cartFavoriteItems, action.payload),
        };
  
    default:
      return state;
  }
};

export default cartReducer;