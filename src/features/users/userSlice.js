import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    isAuth: true,
    isAdmin: false,
    userName: "",
  },
};
const userSilce = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfile: (state, action) => {},
  },
});

export default userSilce.reducer;
export const { setProfile } = userSilce.actions;
