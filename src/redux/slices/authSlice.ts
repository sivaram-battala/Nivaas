import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userData: null;
  role: string | null;
  tokenType: string | null;
  storeToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userData: null,
  role: null,
  tokenType: null,
  storeToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.tokenType = action.payload.tokenType;
    },
    userDataAction: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    updatUserDataAction: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    logoutAction: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.userData = null;
    },
    setstoreToken: (state, action: PayloadAction<any>) => {
      state.storeToken = action.type + '' + action.payload;
    },
  },
});

export const { loginAction, updatUserDataAction, logoutAction ,userDataAction, setstoreToken} =
  authSlice.actions;

export default authSlice.reducer;
