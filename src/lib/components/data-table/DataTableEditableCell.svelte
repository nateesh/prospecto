<script lang="ts">
	import { DataColumn, BodyRow } from 'svelte-headless-table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

	type Item = $$Generic;

	export let row: BodyRow<Item>;
	export let column: DataColumn<Item>;
	export let value: any;
	export let props: any;
	export let onUpdateValue: (rowDataId: string, columnId: string, newValue: unknown) => void;
	
	// set the original value for style purposes
	const originalValue: any = value;
	
	const dropDownExists = (props.hasOwnProperty('dropDown'));
	const options = props['dropDown'];
	const optionValues: string[] = dropDownExists ? Object.values(props['dropDown']) : [];

	let isEditing = false;

	let inputElement: HTMLInputElement | undefined;
	$: if (isEditing) {
		inputElement?.focus();
	}

	const handleCancel = () => {
		isEditing = false;
	};

	const handleSubmit = () => {
		isEditing = false;
		if (row.isData()) {
			onUpdateValue(row.dataId, column.id, value);
		}
	};
</script>

<div class={(value != originalValue) ? 'bg-lime-900/35' : ''}>
	{#if !isEditing}
		{#if value === null && !dropDownExists}
			<Button variant="secondary" on:click={() => (isEditing = true)}></Button>
		{:else if dropDownExists}
			<Button variant="ghost" on:click={() => (isEditing = true)}>
				{props['dropDown'][value]}
			</Button>
		{:else}
			<Button variant="ghost" on:click={() => (isEditing = true)}>{value}</Button>
		{/if}
	{:else if dropDownExists}
		<form on:submit|preventDefault={handleSubmit}>
			<Select.Root open={true} closeOnOutsideClick={true} selected={value}
			onSelectedChange={(selected) => { value = (selected?.value === 'true'); console.log(selected?.value); }}>
				<Select.Trigger>
					<Select.Value placeholder={props['dropDown'][value]} />
				</Select.Trigger>
				<Select.Content>
					{#each optionValues as option}
						<Select.Item label={option.toString()} on:click={(event) => { event?.stopPropagation(); }}
						value={Object.keys(options).find(key => options[key] === option.toString())}>
							{option}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<button type="submit">✅</button>
			<button on:click={handleCancel}>❌</button>
		</form>
	{:else}
		<form on:submit|preventDefault={handleSubmit}>
      <!-- <Input bind:this={inputElement} type="text" bind:value /> -->
			<input bind:this={inputElement} type="text" bind:value />
			<button type="submit">✅</button>
			<button on:click={handleCancel}>❌</button>
		</form>
	{/if}
</div>

<style>
	form {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0;
		border: none;
		background: transparent;
	}
</style>
