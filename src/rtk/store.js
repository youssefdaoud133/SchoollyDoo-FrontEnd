import { configureStore } from "@reduxjs/toolkit";
import RouteReducer from "./slices/RouteSlice";
import AccountReducer from "./slices/AccountSlice";
import ReadNotificatinsReducer from "./slices/ReadNotificatinsSlice";

export const store = configureStore({
  reducer: {
    RouteName: RouteReducer,
    AccountName: AccountReducer,
    ReadNotificatins: ReadNotificatinsReducer,
  },
});
