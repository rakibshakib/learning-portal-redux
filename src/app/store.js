import { configureStore } from "@reduxjs/toolkit";
import { rootAPI } from "../features/apiSlice";
import userSilce from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    [rootAPI.reducerPath]: rootAPI.reducer,
    profile: userSilce,
  },
  middleware: (dflt) => {
    return dflt().concat(rootAPI.middleware);
  },
});
