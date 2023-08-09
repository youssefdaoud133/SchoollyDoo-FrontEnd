import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    data: [],
  },
};

export const ReadNotificatinsSlice = createSlice({
  name: "ReadNotificatinsSlice",
  initialState,
  reducers: {
    addReadNotificatin: (state, action) => {
      state.value.data.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReadNotificatin } = ReadNotificatinsSlice.actions;

export default ReadNotificatinsSlice.reducer;
