<script lang="ts">
	import { Dashboard } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Dashboard</h1>
{#if data.profile?.first_name}
	<p>Welcome {data.profile?.first_name}</p>
{:else}
	<p>Welcome! Username: {data.session.user.email}</p>
{/if}
