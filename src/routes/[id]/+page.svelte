<script>
	export let data;
	import { formatName, gramsToKilos, convertHeight, fetchInParallel } from '../../helpers/base';

	const calculateStatPerecnt = (stat) => {
		return (stat / 180) * 100;
	};

	const getStatColor = (percent) => {
		if (percent < 25) return 'bg-amber-500';
		if (percent < 50) return 'bg-green-500';
		if (percent < 75) return 'bg-teal-500';
		return 'bg-cyan-500';
	};

	const getEvolutionChain = async () => {
		try {
			const evolutionResponse = await fetch(data.species.evolution_chain.url);
			const evolutionJson = await evolutionResponse.json();

			const speciesUrls = [];
			const getSpeciesUrlsRecursively = (object) => {
				if (object.evolves_to) {
					speciesUrls.push(object.species.url);
					object.evolves_to.forEach((evolutionData) => {
						getSpeciesUrlsRecursively(evolutionData);
					});
				} else {
					return;
				}
			};

			getSpeciesUrlsRecursively(evolutionJson.chain);

			console.log(speciesUrls);
			const speciesJson = await fetchInParallel(speciesUrls);
			console.log(speciesJson);
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div>
	<div class="flex flex-col items-center mb-4">
		<img src={data.monster.image} alt={data.monster.name} />
		<h1 class="font-semibold text-4xl mb-4">{data.monster.name}</h1>
		{#if data.species.genus}
			<div class="mb-2">{data.species.genus}</div>
		{/if}
		<div class="flex flex-row gap-2">
			{#each data.monster.types as typeObj}
				<div class="p-1 px-4 border rounded-full">{formatName(typeObj.type.name)}</div>
			{/each}
		</div>
	</div>

	{#if data.species.flavor_text}
		<p class="mb-4">{data.species.flavor_text}</p>
	{/if}

	<div class="flex justify-between mb-4">
		<div>
			<h4 class="font-medium">Height</h4>
			<span>{convertHeight(data.monster.height)} m</span>
		</div>
		<div class="text-right">
			<h4 class="font-medium">Weight</h4>
			<span>{gramsToKilos(data.monster.weight)} kg</span>
		</div>
	</div>

	<div class="flex justify-between mb-4">
		<div>
			<h4 class="font-medium">Habitat</h4>
			{#if data.species.habitat}
				<div>{data.species.habitat.name}</div>
			{:else}
				<div class="text-gray-500">NA</div>
			{/if}
		</div>
		<div class="text-right">
			<h4 class="font-medium">Number</h4>
			<div>{data.monster.id}</div>
		</div>
	</div>

	<div class="mb-4">
		<h2 class="font-semibold">Stats</h2>
		{#each data.monster.stats as statObj}
			<div class="flex gap-4 items-center">
				<h3 style="flex: 0.4;">{statObj.stat.name}</h3>
				<div style="flex: 0.2;">{statObj.base_stat}</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 flex-1">
					<div
						class="{getStatColor(calculateStatPerecnt(statObj.base_stat))} h-2.5 rounded-full"
						style="width: {calculateStatPerecnt(statObj.base_stat)}%; max-width: 100%;"
					/>
				</div>
			</div>
		{/each}
	</div>

	<button
		on:click={getEvolutionChain}
		type="button"
		class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 w-full text-center focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
		>View Evolution Chain</button
	>
</div>
