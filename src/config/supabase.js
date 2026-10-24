import { createClient } from '@supabase/supabase-js';

const url = 'https://gufpkxrjqbreysguujkq.supabase.co';
const key = 'sb_publishable_analxve97-0WTjtJazXO4A_6nLJtMfm';

export const supabase = createClient(url, key);
