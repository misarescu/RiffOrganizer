import { configureStore } from '@reduxjs/toolkit';
import { supabaseReducer } from './supabase-slice';

const store = configureStore({
  reducer: { API: supabaseReducer },
});

export default store;
export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;
