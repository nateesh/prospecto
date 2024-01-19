<script lang="ts">
  import DataTable from '$lib/components/data-table/DataTable.svelte';

	import { Dashboard } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';

	export let data;
</script>

<div class="bg-stone-400 dark:bg-stone-900">
	
	<DataTable {data}></DataTable>
</div>
