// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadAuthDataFromStorage = () => (dispatch) => {
  const storedAuthData = JSON.parse(localStorage.getItem("auth")) || {};
  if (storedAuthData.token && storedAuthData.user) {
    dispatch(userLoggedIn(storedAuthData));
  }
};

const initialState = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Save authentication data to local storage when user logs in
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      // Clear authentication data from local storage when user logs out
      localStorage.removeItem("auth");
    },
  },
});

export { loadAuthDataFromStorage };
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
