<script lang="ts">
	import "../app.css";
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import { Sun, Moon } from "radix-icons-svelte";
	import { Button } from "$lib/components/ui/button"

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<ModeWatcher />
<Button on:click={toggleMode} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>

<style lang="postcss">
	:global(html) {
	  background-color: theme(colors.lime.50);
	}
</style>