import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity; // Update the quantity
        localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
      }
    },
  },
});

export const { addCart, removeCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
