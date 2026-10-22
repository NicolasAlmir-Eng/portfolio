import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gufpkxrjqbreysguujkq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_analxve97-0WTjtJazXO4A_6nLJtMfm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
