import { createSlice } from "@reduxjs/toolkit";

export const CurrentBillSlice = createSlice({
  name: "currentBill",
  initialState: {
    billId: null,
  },
  reducers: {
    setCurrentBill: (state, action) => {
      state.billId = action.payload.billId;
    },
    clearCurrentBill: (state) => {
      state.billId = null;
    },
  },
});

export const { setCurrentBill, clearCurrentBill } = CurrentBillSlice.actions;
export default CurrentBillSlice.reducer;
