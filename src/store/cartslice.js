import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += product.price;
      } else {
        state.cartItems.push({ ...product, quantity: 1, totalPrice: product.price });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalPrice -= state.cartItems[itemIndex].totalPrice;
        state.cartItems.splice(itemIndex, 1);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
