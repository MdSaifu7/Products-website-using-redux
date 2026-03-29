import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const queryProductSlice = createSlice({
  name: "queryProduct",
  initialState,
  reducers: {
    loadQueryProduct: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export default queryProductSlice.reducer;
export const { loadQueryProduct } = queryProductSlice.actions;
