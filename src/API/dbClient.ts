import { createClient } from '@supabase/supabase-js';
import { Database } from './dbTypes';

export default createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_CLIENT_API_KEY
);
