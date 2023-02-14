<script>
	export let data;
</script>

<div class="grid grid-cols-3 gap-2">
	{#each data.monsters as monster}
		<article>
			<div class="flex flex-col items-center ">
				<img loading="lazy" src={monster.image} alt={monster.name} />
				<a data-sveltekit-preload-data="tap" href="/{monster.id}">
					<h3 class="font-medium">{monster.name}</h3></a
				>
			</div>
		</article>
	{/each}
</div>
