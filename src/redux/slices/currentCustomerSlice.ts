import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 currentCustomerData:any;
}

const initialState: AuthState = {
    isLoading:false,
    currentCustomerData:null,
};

export const currentCustomerSlice = createSlice({
  name: 'currentCustomerSlice',
  initialState,
  reducers: {
    setcurrentCustomerData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.currentCustomerData = action.payload;
    },
  },
});

export const { setcurrentCustomerData} =
  currentCustomerSlice.actions;

export default currentCustomerSlice.reducer;
