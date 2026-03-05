import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproduct: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export default productSlice.reducer;
export const { loadproduct } = productSlice.actions;
