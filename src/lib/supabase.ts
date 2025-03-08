
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use either environment variables or fallback to placeholder values
// These should be replaced with actual values in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yojklwblzbtrsnlqtrhq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
