import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

type DataType = {
  session: any; // replace 'any' with the actual type of 'session'
};

export const load = async ({ fetch, data, depends }: { fetch: any; data: DataType; depends: any }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data ? data.session : null
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return { supabase, session };
};