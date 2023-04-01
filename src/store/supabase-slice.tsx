import { createSlice } from '@reduxjs/toolkit';
import { createClient } from '@supabase/supabase-js';

const initialState = {
  dbClient: createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_CLIENT_API_KEY
  ),
};

const supabaseSlice = createSlice({
  name: 'supabase',
  initialState,
  reducers: {}, // we don't need to change the client connection to supabase
});

export const supabaseReducer = supabaseSlice.reducer;
export const supabaseActions = supabaseSlice.actions;
