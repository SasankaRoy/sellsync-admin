import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setLogginUser: (state, action) => {
      state = action.payload;
    },
    clearLoggedInUser: (state) => {
      state = null;
    },
  },
});

export const { setLoggedInUser, clearLoggedInUser } = UserSlice.actions;
export default UserSlice.reducer;
