<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'

	export let data
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
		<Auth
			supabaseClient={data.supabase}
			view="sign_in"
			redirectTo={`${data.url}/account`}
			showLinks={true}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
	</div>
  <h1>Register</h1>
  <a class="border-2 p-3" href="/register">Register</a>
</div>