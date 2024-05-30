import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 apartmentPrepaidMeters:any;
}

const initialState: AuthState = {
    isLoading:false,
    apartmentPrepaidMeters:null,
};

export const apartmentPrepaidMetersList = createSlice({
  name: 'apartmentPrepaidMetersList',
  initialState,
  reducers: {
    setapartmentPrepaidMeters:(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.apartmentPrepaidMeters = action.payload;
    },
  },
});

export const {setapartmentPrepaidMeters} =
  apartmentPrepaidMetersList.actions;

export default apartmentPrepaidMetersList.reducer;
