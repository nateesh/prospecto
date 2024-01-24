<script lang="ts">
	import { get, readable, writable } from 'svelte/store';
	import { Dashboard } from 'radix-icons-svelte';
	import * as Table from '$lib/components/ui/table';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addDataExport,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import DataTableDateCell from './DataTableDateCell.svelte';
	import DataTableEditableCell from './DataTableEditableCell.svelte';

	import type { TenementsSummarySelect } from '$lib/server/schema.types';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: any;
	let tenementsSummary: TenementsSummarySelect[] = data.tenements_summary;
	// put tenements_summary into a svelte store baned dataTenementsSummary
	let tenementsSummaryStore = readable(tenementsSummary);

	// const tableData = writable(tenements_summary_insert);
	//console log first row of table data
	// console.log(get(tableData)[0]);

	var newData: Array<{ rowDataId: any; tenement: any; columnId: any; newValue: any }> = [];
	var newDataString = '';
	$: newDataString = JSON.stringify(newData);

	const updateData = (rowDataId: any, columnId: any, newValue: any) => {
		// get the tenement
		const tenement = get(tenementsSummaryStore)[rowDataId]['tenement'];
		//remove the record being replaced
		if (newData.length > 0) {
			for (let i = 0; i < newData.length; i++) {
				if (newData[i].rowDataId === rowDataId && newData[i].columnId === columnId) {
					newData.splice(i, 1);
				}
			}
		}
		
    newData = [...newData, { rowDataId, tenement, columnId, newValue }];
		console.log(newData);

	};

	const table = createTable(readable(tenementsSummary), {
		export: addDataExport({
			format: 'csv'
		}),
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
					disable: false
				}
			}
		}),
		table.column({
			accessor: 'tenement',
			header: 'Tenement',
			id: 'tenement',
			plugins: {
				sort: {
					disable: false
				}
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Name',
			id: 'name'
		}),
		table.column({
			accessor: 'state',
			header: 'State',
			id: 'state'
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
			id: 'year'
		}),
		table.column({
			accessor: 'applYears',
			header: 'Appl Years',
			id: 'applYears'
		}),
		table.column({
			accessor: 'location',
			header: 'Location',
			id: 'location'
		}),
		table.column({
			accessor: 'ha',
			header: 'Ha',
			id: 'ha'
		}),
		table.column({
			accessor: 'subBlocks',
			header: 'Sub Blocks',
			id: 'subBlocks'
		}),
		table.column({
			accessor: 'sqkm',
			header: 'Sq Km',
			id: 'sqkm'
		}),
		table.column({
			accessor: 'rentPA',
			header: 'Rent P.A.',
			id: 'rentPA'
		}),
		table.column({
			accessor: 'rentPaid',
			header: 'Rent Paid?',
			id: 'rentPaid',
			cell: ({ column, row, value, props }) => {
				return createRender(DataTableEditableCell, { 
					row, column, value, props: {"dropDown": {"true": "Y", "false": "N"}}, onUpdateValue: updateData 
				});
			}
		}),
		table.column({
			accessor: 'rentPerSubBlock',
			header: 'Rent Per Sub Block',
			id: 'rentPerSubBlock',
			cell: ({ column, row, value, props }) => {
				return createRender(DataTableEditableCell, { 
					row, column, value, props, onUpdateValue: updateData 
				});
			}
		}),
		table.column({
			accessor: 'security',
			header: 'Security',
			id: 'security'
		}),
		table.column({
			accessor: 'enviroAuthority',
			header: 'Enviro Authority',
			id: 'enviroAuthority'
		}),
		table.column({
			accessor: 'eaType',
			header: 'EA Type',
			id: 'eaType'
		}),
		table.column({
			accessor: 'eaDate',
			header: 'EA Date',
			id: 'eaDate',
			cell: ({ value }) => {
				return createRender(DataTableDateCell, {
					value: value
				});
			}
		}),
		table.column({
			accessor: 'enviroFeePaid',
			header: 'EA Fee Paid',
			id: 'enviroFeePaid',
			cell: ({ column, row, value, props }) => {
				return createRender(DataTableEditableCell, { 
					row, column, value, props: {"dropDown": {"true": "Y", "false": "N"}}, onUpdateValue: updateData 
				});
			}
		}),
	]);

	const tableModel = table.createViewModel(columns);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = tableModel;
	const { exportedData } = pluginStates.export;
	let exportedDataValue: string = get(exportedData); //this is type string
	//write to file and download
	function downloadFile(dataValue: string) {
		const blob = new Blob([dataValue], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', 'export.csv');
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	}
</script>

<div class="flex mb-5">
	<h1 class="text-xl font-bold">Tenements Summary Dashboard</h1>
	<div class="ml-auto flex space-x-3">
		<Button type="button" size="sm" on:click={() => downloadFile(exportedDataValue)}>Export</Button>
	
		<form method="POST" action="?/update">
			<input type="hidden" bind:value={newDataString} name="newData" />
			<Button type="submit" size="sm" variant="default">Save Changes</Button>
		</form>
	</div>
</div>

<Table.Root {...$tableAttrs}>
	<Table.Header>
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()} rowProps={headerRow.props()} let:rowProps>
				<Table.Row>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<Table.Head>{cell.label}</Table.Head>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Header>
	<Table.Body {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<Table.Row {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell {...attrs} class="">
								{#if cell.render().toString() === 'null'}
									-
								{:else}
									<Render of={cell.render()} />
								{/if}
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>

<!-- <Table.Root>
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
</Table.Root> -->
