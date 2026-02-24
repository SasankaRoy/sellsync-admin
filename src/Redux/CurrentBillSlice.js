import { createSlice } from "@reduxjs/toolkit";

export const CurrentBillSlice = createSlice({
  name: "currentBill",
  initialState: {
    billId: null,
    currentCustomerDetails: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      customerNotes: ''
    }
  },
  reducers: {
    setCurrentBill: (state, action) => {
      const { billId } = action.payload
      state.billId = billId;

    },
    setCurrentCustomerDetails: (state, action) => {
      const { currentCustomerDetails } = action.payload
      state.currentCustomerDetails[currentCustomerDetails.name] = currentCustomerDetails.value
    },
    clearCurrentBill: (state) => {
      state.billId = null;
      state.currentCustomerDetails = {
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
        customerNotes: '',
        ageVerificationRequired:false,
        isVerified:false,
        customerPresentAge:''
      };
    },
  },
});

export const { setCurrentBill, clearCurrentBill, setCurrentCustomerDetails } = CurrentBillSlice.actions;
export default CurrentBillSlice.reducer;
