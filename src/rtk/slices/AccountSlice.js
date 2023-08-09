import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    data:
      JSON.parse(window.localStorage.getItem("User")) !== null
        ? JSON.parse(window.localStorage.getItem("User")).data
        : { name: "" },
  },
};

export const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: {
    changeaccount: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeaccount } = AccountSlice.actions;

export default AccountSlice.reducer;
