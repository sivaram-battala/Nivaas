import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 currentCustomerData:any;
 profilePicture:any;
}

const initialState: AuthState = {
    isLoading:false,
    currentCustomerData:null,
    profilePicture:null,
};

export const currentCustomerSlice = createSlice({
  name: 'currentCustomerSlice',
  initialState,
  reducers: {
    setcurrentCustomerData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.currentCustomerData = action.payload;
    },
    setprofilePic:(state,action:PayloadAction<any>)=>{
      state.profilePicture = action.payload
    }
  },
});

export const { setcurrentCustomerData,  setprofilePic} =
  currentCustomerSlice.actions;

export default currentCustomerSlice.reducer;
