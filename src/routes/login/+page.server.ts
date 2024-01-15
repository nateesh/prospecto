import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string,
            options: {
                emailRedirectTo: "/account"
            }
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		}

		throw redirect(303, "/login/verify-email")
	},

	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		}

		throw redirect(303, "/dashboard")
	},

	forgot: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.supabase.auth.resetPasswordForEmail(body.email as string, {
			redirectTo: '/login/reset-password',
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		}

		// throw redirect(303, "/login/reset-password")
	}
}