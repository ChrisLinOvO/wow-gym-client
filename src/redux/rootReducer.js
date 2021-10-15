import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //get window localstorage

import cartReducer from "./cart/cart-reducer";
import shopReducer from "./shop/shop-reducer";
import navBarReducer from "./nav-bar/navBar-reducer";
import userReducer from "./user/user-reducer";
import employeeReducer from "./employee/employee-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart","employee"],
  blacklist: ["shop"],
};

// const userPersistConfig = {
//   key: "user",
//   storage,
//   blacklist: ["userSignUpUnVaild"],
// };

const rootReducer = combineReducers({
  cart: cartReducer,
  shop: shopReducer,
  navBar: navBarReducer,
  user: userReducer,
  employee: employeeReducer,
});

export default persistReducer(persistConfig, rootReducer);
