import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,  // track if the user is logged in
  user: null,  // store user details (if any)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
