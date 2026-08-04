import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

let counter = 0;

const calculateTotals = (state) => {
  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  state.totalAmount = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

const isSamePizza = (item1, item2) => {
  // Compare by id and toppings (support legacy where toppings may be stored in `ingredients`)
  const toppingsA = item1.toppings ?? item1.ingredients ?? [];
  const toppingsB = item2.toppings ?? item2.ingredients ?? [];
  return (
    item1.id === item2.id &&
    JSON.stringify([...toppingsA].sort()) ===
      JSON.stringify([...toppingsB].sort())
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newPizza = action.payload;

      // Normalize payload: ensure `ingredients` (base) and `toppings` (selected extras) exist.
      const normalized = {
        ...newPizza,
        ingredients: newPizza.ingredients ?? [],
        toppings: newPizza.toppings ?? newPizza.topping ?? [],
      };

      const existingPizza = state.cartItems.find((item) =>
        isSamePizza(item, normalized),
      );

      if (existingPizza) {
        existingPizza.quantity += 1;
      } else {
        state.cartItems.push({
          ...normalized,
          cart_id: "C0" + counter,
        });
        counter++;
      }

      calculateTotals(state);
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cart_id !== action.payload,
      );
      calculateTotals(state);
    },
    increaseQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.cart_id === action.payload,
      );
      if (item) {
        item.quantity += 1;
      }
      calculateTotals(state);
    },
    decreaseQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.cart_id === action.payload,
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload,
        );
      }
      calculateTotals(state);
    },
    modifyIngredients(state, action) {
      // payload: { id: cart_id, toppings: [...], price }
      const { id, toppings, price } = action.payload;
      const item = state.cartItems.find((item) => item.cart_id === id);
      if (!item) return;
      item.toppings = toppings;
      item.price = price; // toppings changed price, so update it
      calculateTotals(state);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  modifyIngredients,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
