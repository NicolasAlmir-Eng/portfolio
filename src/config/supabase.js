import { createClient } from '@supabase/supabase-js';

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gufpkxrjqbreysguujkq.supabase.co').replace(/['"]/g, '').trim();
const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_analxve97-0WTjtJazXO4A_6nLJtMfm').replace(/['"]/g, '').trim();

export const supabase = createClient(url, key);
