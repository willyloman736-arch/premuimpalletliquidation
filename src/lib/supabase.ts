import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** True when Supabase credentials are present in the environment. */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

/** Returns a memoised Supabase client, or null when not configured. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) client = createClient(url as string, anonKey as string);
  return client;
}
