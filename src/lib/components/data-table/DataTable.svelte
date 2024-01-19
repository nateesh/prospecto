<script lang="ts">
	import { get, readable } from 'svelte/store';
	import { Dashboard } from 'radix-icons-svelte';
	import * as Table from '$lib/components/ui/table';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import DataTableDateCell from './DataTableDateCell.svelte';

	// import type { PageData } from './$types';
	import type { TenementsSummarySelect } from '$lib/server/schema.types';

	export let data: any;
	let tenements_summary: TenementsSummarySelect[] = data.tenements_summary;

	// let { session, supabase, tenements_summary } = data;

	// export let data.tenements_summary: TenementsSummarySelect;

	const table = createTable(readable(tenements_summary), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				return value.toLowerCase().includes(filterValue.toLowerCase());
			}
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'operator',
			header: 'Operator',
			id: 'operator',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'tenement',
			header: 'Tenement',
			id: 'tenement'
			// cell: ({ value }) =>
			// createRender(Bold, {
			//   text: value,
			// }),
		}),
		table.column({
			accessor: 'name',
			header: 'Name',
			id: 'name'
			// cell: ({ value }) =>
			// createRender(Bold, {
			//   text: value,
			// }),
		}),
		table.column({
			accessor: 'state',
			header: 'State',
			id: 'state'
			// cell: ({ value }) =>
			// createRender(Bold, {
			//   text: value,
			// }),
		}),
		table.column({
			accessor: 'grant',
			header: 'Grant',
			id: 'grant',
			cell: ({ value }) => {
				return createRender(DataTableDateCell, {
					value: value
				});
			}
		}),
		table.column({
			accessor: 'commencement',
			header: 'Commencement',
			id: 'commencement',
			cell: ({ value }) => {
				return createRender(DataTableDateCell, {
					value: value
				});
			}
		}),
		table.column({
			accessor: 'expiry',
			header: 'Expiry',
			id: 'expiry',
			cell: ({ value }) => {
				return createRender(DataTableDateCell, {
					value: value
				});
			}
		}),
		table.column({
			accessor: 'year',
			header: 'Year',
			id: 'year',
		}),
		table.column({
			accessor: 'applYears',
			header: 'Appl Years',
			id: 'applYears',
		}),
		table.column({
			accessor: 'location',
			header: 'Location',
			id: 'location',
		}),
		table.column({
			accessor: 'ha',
			header: 'Ha',
			id: 'ha',
		}),
		table.column({
			accessor: 'subBlocks',
			header: 'Sub Blocks',
			id: 'subBlocks',
		}),
		table.column({
			accessor: 'sqkm',
			header: 'Sq Km',
			id: 'sqkm',
		}),
		table.column({
			accessor: 'rentPA',
			header: 'Rent P.A.',
			id: 'rentPA',
		}),
		table.column({
			accessor: 'security',
			header: 'Security',
			id: 'security',
		}),
		table.column({
			accessor: 'enviroAuthority',
			header: 'Enviro Authority',
			id: 'enviroAuthority',
		}),
		table.column({
			accessor: 'eaType',
			header: 'EA Type',
			id: 'eaType',
		}),
		table.column({
			accessor: 'eaDate',
			header: 'EA Date',
			id: 'eaDate',
			cell: ({ value }) => {
				return createRender(DataTableDateCell, {
					value: value
				});
			},
		}),
		
	]);
	
	const tableModel = table.createViewModel(columns);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
</script>

<Table.Root {...$tableAttrs}>
	<Table.Header>
		{#each $headerRows as headerRow}
			<Table.Row>
				{#each headerRow.cells as cell (cell.id)}
					<Table.Head>{cell.label}</Table.Head>
				{/each}
			</Table.Row>
		{/each}
	</Table.Header>
	<Table.Body {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<Table.Row {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell {...attrs} class="">
								<Render of={cell.render()} />
								<!-- {cell.render()} -->
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>

<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			{#if data.tenements_summary && data.tenements_summary.length > 0}
				{#each Object.keys(data.tenements_summary[0]).slice(3) as key}
					<Table.Head>{key}</Table.Head>
				{/each}
			{/if}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if data.tenements_summary}
			{#each data.tenements_summary as tenement}
				<Table.Row>
					{#each Object.keys(tenement).slice(3) as key}
						<Table.Cell>{tenement[key]}</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>
