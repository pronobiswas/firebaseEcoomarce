import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedInUser } = AuthSlice.actions

export default AuthSlice.reducer