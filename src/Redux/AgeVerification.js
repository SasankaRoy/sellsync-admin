import { createSlice } from "@reduxjs/toolkit";

export const AgeVerificationSlice = createSlice({
    name: "verifyCustomerAge",
    initialState: {
        ageVerificationRequired: false,
        requiredAge:'',
        isVerified: false,
        customerPresentAge: '',
        sessionUrl: ''
    },
    reducers: {
        verificationRequired: (state, action) => {
            const {ageRequired,isVerificationRequired} = action.payload;
            state.ageVerificationRequired = isVerificationRequired;
            state.requiredAge = ageRequired
        },
        setSessionURl: (state, action) => {
            state.sessionUrl = action.payload
        },
        isVerified: (state, action) => {
            const { age, verifiedStatus } = action.payload;
            state.customerPresentAge = age;
            state.isVerified = verifiedStatus;
        },
        clearState: (state) => {
            state.ageVerificationRequired = false;
            state.isVerified = false;
            state.customerPresentAge = '';
            state.requiredAge = '';
            state.sessionUrl = ''
        }
    }
})


export const { clearState, isVerified, verificationRequired,setSessionURl } = AgeVerificationSlice.actions
export default AgeVerificationSlice.reducer