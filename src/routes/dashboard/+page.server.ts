import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { tenementsSummary } from '@/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/login')
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select(`first_name, last_name, company`)
    .eq('id', session.user.id)
    .single()

  const tenements_summary = await db
    .select()
    .from(tenementsSummary)
    .where(eq(tenementsSummary.owner, session.user.id))
    .execute();   

  // const { data: tenements_summary } = await supabase
  // .from('tenements_summary')
  // .select('*')

  return { session, tenements_summary, profile }
}
