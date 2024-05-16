import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 apartmentsData:any;
 blocksData:any;
}

const initialState: AuthState = {
    isLoading:false,
    apartmentsData:null,
    blocksData:null
};

export const apartmentsDataSlice = createSlice({
  name: 'apartmentsDataSlice',
  initialState,
  reducers: {
    setapartmentData:(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.apartmentsData = action.payload;
    },
  },
});

export const {setapartmentData} =
  apartmentsDataSlice.actions;

export default apartmentsDataSlice.reducer;
