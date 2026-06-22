import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Session } from '../types';

const initialState: Session = {
  isAuthenticated: false,
  user: null,
  isEmergencyMode: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isEmergencyMode = false;
    },
    setEmergencyMode: (state, action: PayloadAction<boolean>) => {
      state.isEmergencyMode = action.payload;
    },
    clearSession: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isEmergencyMode = false;
    },
  },
});

export const { setUser, logout, setEmergencyMode, clearSession } =
  authSlice.actions;

export default authSlice.reducer;
