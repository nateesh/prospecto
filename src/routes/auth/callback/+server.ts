import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  } else {
    throw new Error('Authorization code is missing from the URL')
  }

  throw redirect(303, '/account')
}