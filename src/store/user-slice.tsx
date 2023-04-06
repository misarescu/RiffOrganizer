import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: {
    fullName: '',
    email: '',
  },
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
    setUserInfo(state, action) {
      state.userInfo.fullName = action.payload.fullName;
      state.userInfo.email = action.payload.email;
    },
    resetUser(state) {
      state = initialState;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
