import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
