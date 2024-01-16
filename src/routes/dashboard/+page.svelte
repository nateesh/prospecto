<script lang="ts">
	import { Dashboard } from 'radix-icons-svelte';
	import type { PageData } from './$types';
  import * as Table from "$lib/components/ui/table"
  

	export let data: PageData;
</script>

<h1>Dashboard</h1>
{#if data.profile?.first_name}
	<p>Welcome {data.profile?.first_name}</p>
{:else}
	<p>Welcome! Username: {data.session.user.email}</p>
{/if}

<div class="">
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Operator</Table.Head>
        <Table.Head>Tenement</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head>State</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Grant</Table.Head>
        <Table.Head>Commencement</Table.Head>
        <Table.Head>Expiry</Table.Head>
        <Table.Head>Year</Table.Head>
        <Table.Head>Appl Year</Table.Head>
        <Table.Head>Location</Table.Head>
        <Table.Head>HA</Table.Head>
        <Table.Head>S-b</Table.Head>
        <Table.Head>SqKm</Table.Head>
        <Table.Head>EA Number</Table.Head>
        <Table.Head>EA Type</Table.Head>
        <Table.Head>EA Date</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Yarraman Metals</Table.Cell>
        <Table.Cell>EPM22753</Table.Cell>
        <Table.Cell>Juntala-1</Table.Cell>
        <Table.Cell>QLD</Table.Cell>
        <Table.Cell>C</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>04/08/2026</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>0</Table.Cell>
        <Table.Cell>90KM Einsleigh</Table.Cell>
        <Table.Cell>29440</Table.Cell>
        <Table.Cell>56</Table.Cell>
        <Table.Cell>294.4</Table.Cell>
        <Table.Cell>EA000123</Table.Cell>
        <Table.Cell>Standard EA</Table.Cell>
        <Table.Cell>05/Aug</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Yarraman Metals</Table.Cell>
        <Table.Cell>EPM22753</Table.Cell>
        <Table.Cell>Juntala-1</Table.Cell>
        <Table.Cell>QLD</Table.Cell>
        <Table.Cell>C</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>04/08/2026</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>0</Table.Cell>
        <Table.Cell>90KM Einsleigh</Table.Cell>
        <Table.Cell>29440</Table.Cell>
        <Table.Cell>56</Table.Cell>
        <Table.Cell>294.4</Table.Cell>
        <Table.Cell>EA000123</Table.Cell>
        <Table.Cell>Standard EA</Table.Cell>
        <Table.Cell>05/Aug</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Yarraman Metals</Table.Cell>
        <Table.Cell>EPM22753</Table.Cell>
        <Table.Cell>Juntala-1</Table.Cell>
        <Table.Cell>QLD</Table.Cell>
        <Table.Cell>C</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>05/08/2021</Table.Cell>
        <Table.Cell>04/08/2026</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>0</Table.Cell>
        <Table.Cell>90KM Einsleigh</Table.Cell>
        <Table.Cell>29440</Table.Cell>
        <Table.Cell>56</Table.Cell>
        <Table.Cell>294.4</Table.Cell>
        <Table.Cell>EA000123</Table.Cell>
        <Table.Cell>Standard EA</Table.Cell>
        <Table.Cell>05/Aug</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</div>
