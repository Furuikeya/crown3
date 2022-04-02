import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseItemCount: () => {},
  removeItem: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unknown action type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, totalPrice } = state;

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    const newTotalPrice = newCartItems.reduce((acc, item) => {
      const { quantity, price } = item;
      return acc + quantity * price;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItem = (targetItem) => {
    const newCartItems = removeItemFromCart(cartItems, targetItem);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemCount = (targetItem) => {
    const newCartItems = decreaseItemQuantity(cartItems, targetItem);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemCount,
    removeItem,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
