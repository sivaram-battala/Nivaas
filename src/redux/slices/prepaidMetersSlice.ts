import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
//  isLoading:boolean;
 setPrepaidMetersData:any;
}

const initialState: AuthState = {
    // isLoading:false,
    setPrepaidMetersData:null,
};

export const prepaidMetersSlice = createSlice({
  name: 'prepaidMetersSlice',
  initialState,
  reducers: {
    setPrepaidMetersData :(state,action:PayloadAction<any>) => {
        // state.isLoading = true;
        state.setPrepaidMetersData = action.payload;
    },
  },
});

export const {setPrepaidMetersData } =
  prepaidMetersSlice.actions;

export default prepaidMetersSlice.reducer;
