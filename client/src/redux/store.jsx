import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice.jsx";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
