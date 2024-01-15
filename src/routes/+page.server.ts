import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

// getSession() checks if the user is logged in and returns their session if they are.
export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession()

  // if the user is already logged in return them to the account page
  if (session) {
    throw redirect(303, '/dashboard')
  }
  if (!session) {
    throw redirect(303, '/login')
  }

  return { url: url.origin, session: null }
}