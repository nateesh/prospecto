<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Sun, Moon } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let loading = false;

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<ModeWatcher />
<div class="justify-right">
	<Button on:click={toggleMode} variant="outline" size="icon" class="justify-right">
		<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
		<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
		<span class="sr-only">Toggle theme</span>
	</Button>
	{#if session != null}
		<div class="text-right">
			<h1 class="text-lg font-bold">Welcome, {session.user.email}</h1>
			<form method="post" action="/account?/signout" use:enhance={handleSignOut}>
				<Button type="submit" variant="outline" disabled={loading}>Sign Out</Button>
			</form>
		</div>
	{/if}
</div>
<div class="container" style="padding: 50px 0 100px 0">

	<slot />

</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.lime.50);
	}
</style>
