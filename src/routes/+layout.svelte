<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Sun, Moon, Gear } from 'radix-icons-svelte';
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
	<div class="flex items-center space-x-3 h-20">
    <div class="mr-auto">
      <h1 class="text-3xl font-mono italic font-bold uppercase">Prospecto</h1>
    </div>
		<div class="ml-auto flex flex-wrap space-x-3 items-stretch">
      {#if session != null}
      <Button variant="secondary" href="/account">
        <Gear class="h-[1.2rem] w-[1.2rem] mr-2"/>
        <span class="">Account</span>
      </Button>
      <Button variant="secondary" href="/dashboard">Dashboard</Button>
      <h1 class="text-sm font-bold ">Welcome, {session.user.email}</h1>
      <div class="text">
        <form method="post" action="/account?/signout" use:enhance={handleSignOut}>
          <Button type="submit" variant="secondary" disabled={loading}>Sign Out</Button>
        </form>
      </div>
      {/if}
    </div>
    <div>
      <Button on:click={toggleMode} variant="outline" size="icon" class="">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
	</div>
  <div class="h-screen bg-stone-400 dark:bg-stone-900 px-5 pt-5 rounded-lg">
    <slot />
  </div>
</div>