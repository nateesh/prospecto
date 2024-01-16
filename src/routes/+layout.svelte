<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Sun, Moon } from 'radix-icons-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	import { Button } from '$lib/components/ui/button';

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
<div class="container">
	<div class="flex items-stretch h-16">
    <div class="mr-auto border-2">
      <h1>Prospecto</h1>
    </div>
		<div class="ml-auto flex flex-wrap items-stretch">
      <Button variant="ghost">Nav</Button>
      <div>
        <Button on:click={toggleMode} variant="outline" size="icon" class="">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>
      
      {#if session != null}
      <Button variant="ghost" href="/account">Account</Button>
      <Button variant="ghost" href="/dashboard">Dashboard</Button>
      <h1 class="text-sm font-bold">Welcome, {session.user.email}</h1>
      <div class="text">
        <form method="post" action="/account?/signout" use:enhance={handleSignOut}>
          <Button type="submit" variant="ghost" disabled={loading}>Sign Out</Button>
        </form>
      </div>
      {/if}
    </div>
	</div>
  <div class="h-screen px-5">
    <slot />
  </div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.lime.50);
	}
</style>
