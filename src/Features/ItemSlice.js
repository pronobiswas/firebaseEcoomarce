import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

export const itemSlice = createSlice({
  name: "itemInfo",
  initialState,
  reducers: {
    itemInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { itemInfo } = itemSlice.actions;
export default itemSlice.reducer;
