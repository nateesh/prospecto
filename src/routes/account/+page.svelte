<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let firstName: string = profile?.first_name ?? ''
	let lastName: string = profile?.last_name ?? ''
	let company: string = profile?.company ?? ''

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>

<div class="form-widget">
	<form class="form-widget" method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
	  <div>
		<label for="email">Email</label>
		<input id="email" type="text" value={session.user.email} disabled />
	  </div>
  
	  <div>
		<label for="firstName">First Name</label>
		<input id="firstName" name="firstName" type="text" value={form?.firstName ?? firstName} />
	  </div>
  
	  <div>
		<label for="lastName">Last Name</label>
		<input id="lastName" name="lastName" type="text" value={form?.lastName ?? lastName} />
	  </div>
  
	  <div>
		<label for="company">Company</label>
		<input id="company" name="company" type="text" value={form?.company ?? company} />
	  </div>
  
	  <div>
		<input
		  type="submit"
		  class="button block primary"
		  value={loading ? 'Loading...' : 'Update'}
		  disabled={loading}
		/>
	  </div>
	</form>
  
	<form method="post" action="?/signout" use:enhance={handleSignOut}>
	  <div>
		<button class="button block" disabled={loading}>Sign Out</button>
	  </div>
	</form>
  </div>
  