import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

// blacklisting dropdown from persist
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["isCartOpen"],
};

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});
