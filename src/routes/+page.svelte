<script>
	export let data;
</script>

<div class="flex flex-wrap gap-4">
	{#each data.monsters as monster}
		<article>
			<div class="flex flex-col items-center ">
				<img src={monster.image} alt={monster.name} />
				<a data-sveltekit-preload-data="tap" href="/{monster.id}">
					<h3 class="font-semibold">{monster.name}</h3></a
				>
			</div>
		</article>
	{/each}
</div>
