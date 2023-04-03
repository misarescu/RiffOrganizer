import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginFormVisible: false,
  isSignupFormVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLoginForm(state) {
      state.isLoginFormVisible = true;
    },
    closeLoginForm(state) {
      state.isLoginFormVisible = false;
    },
    openSignupForm(state) {
      state.isSignupFormVisible = true;
    },
    closeSignupForm(state) {
      state.isSignupFormVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
