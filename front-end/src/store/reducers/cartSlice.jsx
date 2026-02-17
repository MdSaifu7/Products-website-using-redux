import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export default cartSlice.reducer;
export const { loadCart } = cartSlice.actions;
