import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

//utils
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems, targetItem) => {
  return cartItems.filter((item) => item.id !== targetItem.id);
};

const decreaseItemQuantity = (cartItems, targetItem) => {
  if (targetItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === targetItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else {
    return cartItems.filter((item) => item.id !== targetItem.id);
  }
};

//actions
export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemCount = (cartItems, targetItem) => {
  const newCartItems = decreaseItemQuantity(cartItems, targetItem);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItem = (cartItems, targetItem) => {
  const newCartItems = removeItemFromCart(cartItems, targetItem);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
