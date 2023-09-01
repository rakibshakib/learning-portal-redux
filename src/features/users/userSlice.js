import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isAdmin: false,
  user: {},
  token: "",
};
const userSilce = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.user.role === "admin" ? true : false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    updateName: (state, action) => {
      state.user.name = action.payload?.name
    },
    logOutProfile: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
      state.user = {};
      state.token = "";
    },
  },
});

export default userSilce.reducer;
export const { setProfile, logOutProfile, updateName } = userSilce.actions;
