<script lang="ts">
	export let value: any;
  const input = value.toString();
  
	//convert this Thu Aug 05 2021 00:00:00 GMT+1000 (Australian Eastern Standard Time) to just the date
	function convertDate(value: string) {
    if (typeof value === 'string') {
      return value.split(' ').slice(1, 4).join(' ');
    }
    return value;
	}
	const date: string = convertDate(input);
</script>

{#if value !== ''}
  {date}
	<!-- <time datetime={date}>{date}</time> -->
{:else}
	-
{/if}
