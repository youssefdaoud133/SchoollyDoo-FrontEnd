import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Home",
};

export const RouteSlice = createSlice({
  name: "RouteSlice",
  initialState,
  reducers: {
    changeroute: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeroute } = RouteSlice.actions;

export default RouteSlice.reducer;
