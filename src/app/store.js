import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userSilce from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userSilce,
  },
});
