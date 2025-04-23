import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const product = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === product.id);

      if (!existingItem) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishList: (state, action) => {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
    },
    clearWishList: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;