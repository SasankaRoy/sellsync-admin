import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./UserSlice";
import { RingUpSlice } from "./RingUpSlice";

const Store = configureStore({
  reducer: {
    loggedUser: UserSlice.reducer,
    ringUps: RingUpSlice.reducer,
  },
});

export default Store;
