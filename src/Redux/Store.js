import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./UserSlice";
import { RingUpSlice } from "./RingUpSlice";
import { CurrentBillSlice } from "./CurrentBillSlice";
import { AgeVerificationSlice } from "./AgeVerification";

const Store = configureStore({
  reducer: {
    loggedUser: UserSlice.reducer,
    ringUps: RingUpSlice.reducer,
    currentBill: CurrentBillSlice.reducer,
    verifyCustomerAge: AgeVerificationSlice.reducer,
  },
});

export default Store;
