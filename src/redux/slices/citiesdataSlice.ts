import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 citiesData:any;
 blocksData:any;
}

const initialState: AuthState = {
    isLoading:false,
    citiesData:null,
    blocksData:null
};

export const citiesdataSlice = createSlice({
  name: 'citiesdataSlice',
  initialState,
  reducers: {
    setcitiesData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.citiesData = action.payload;
    },
  },
});

export const { setcitiesData} =
  citiesdataSlice.actions;

export default citiesdataSlice.reducer;
