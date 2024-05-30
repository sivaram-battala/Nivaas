import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 setProfilePicture:string;
}

const initialState: AuthState = {
    isLoading:false,
    setProfilePicture:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfilePicture :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.setProfilePicture = action.payload;
    },
  },
});

export const {setProfilePicture } =
  profileSlice.actions;

export default profileSlice.reducer;
