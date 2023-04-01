import { configureStore } from '@reduxjs/toolkit';
import { supabaseReducer } from './supabase-slice';

const store = configureStore({
  reducer: { API: supabaseReducer },
});

export default store;
