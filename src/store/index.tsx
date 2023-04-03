import { configureStore } from '@reduxjs/toolkit';
import { supabaseReducer } from './supabase-slice';
import { userReducer } from './user-slice';

const store = configureStore({
  reducer: { API: supabaseReducer, user: userReducer },
});

export default store;
export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;
