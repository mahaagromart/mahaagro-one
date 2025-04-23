import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import wishlistReducer from "./wishlistSlice.js";
import authReducer from "./authSlice.js";
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // Registering cart slice
    wishlist: wishlistReducer, 
    auth: authReducer,
  },
});

export default store;
