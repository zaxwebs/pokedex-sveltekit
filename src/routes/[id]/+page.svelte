<script>
	import MonsterCard from '$components/MonsterCard.svelte';
	import {
		formatName,
		gramsToKilos,
		convertHeight,
		fetchInParallel,
		convertUrlToId
	} from '../../helpers/base';

	export let data;

	let loadingEvolutionChain = false;
	let loadingAllMonsters = false;
	let loadingVariants = false;
	let evolutionPokemonIds = [];
	let evolutionMonsters = [];
	let showVarieties = false;

	let allMonsters = [];

	const calculateStatPercent = (stat) => {
		return (stat / 180) * 100;
	};

	const getStatColor = (percent) => {
		if (percent < 25) return 'bg-amber-500';
		if (percent < 50) return 'bg-green-500';
		if (percent < 75) return 'bg-teal-500';
		return 'bg-cyan-500';
	};

	const fetchMonsters = async () => {
		loadingAllMonsters = true;
		const response = await fetch('/api/pokemon');
		const json = await response.json();
		loadingAllMonsters = false;
		return json;
	};

	const getEvolutionChain = async () => {
		loadingEvolutionChain = true;

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

			const tempEvolutionPokemonIds = [];
			getSpeciesUrlsRecursively(evolutionJson.chain);
			const speciesJson = await fetchInParallel(speciesUrls);

			speciesJson.forEach((species) => {
				tempEvolutionPokemonIds.push(convertUrlToId(species.varieties[0].pokemon.url));
			});

			evolutionPokemonIds = tempEvolutionPokemonIds;

			// const mergeVarietiesRecursively = (object) => {
			// 	if (object.evolves_to) {
			// 		const index = speciesUrls.indexOf(object.species.url);
			// 		object.species.varieties = { ...speciesJson[index].varieties };
			// 		object.evolves_to.forEach((evolutionData) => {
			// 			mergeVarietiesRecursively(evolutionData);
			// 		});
			// 	} else {
			// 		return;
			// 	}
			// };

			// mergeVarietiesRecursively(evolutionJson.chain);

			if (!allMonsters.length) {
				allMonsters = await fetchMonsters();
			}

			let tempEvolutionMonsters = [];

			evolutionPokemonIds.forEach((id) => {
				tempEvolutionMonsters.push(allMonsters.filter((monster) => monster.id === id)[0]);
			});

			evolutionMonsters = tempEvolutionMonsters;
		} catch (e) {
			console.error(e);
		}
	};

	const getVarieties = async () => {
		loadingVariants = true;
		if (!allMonsters.length) {
			allMonsters = await fetchMonsters();
		}
		showVarieties = true;
	};
</script>

<div>
	<div class="flex flex-col items-center mb-4">
		<img src={data.monster.image} alt={data.monster.name} />
		<h1 class="font-medium text-4xl mb-4">{data.monster.name}</h1>
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

	<div class="flex justify-between mb-8">
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

	<div class="mb-8">
		<h2 class="font-medium border-b border-gray-200 pb-2 mb-2">Stats</h2>
		{#each data.monster.stats as statObj}
			<div class="flex gap-4 items-center">
				<h3 style="flex: 0.4;">{statObj.stat.name}</h3>
				<div style="flex: 0.2;">{statObj.base_stat}</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 flex-1">
					<div
						class="{getStatColor(calculateStatPercent(statObj.base_stat))} h-2.5 rounded-full"
						style="width: {calculateStatPercent(statObj.base_stat)}%; max-width: 100%;"
					/>
				</div>
			</div>
		{/each}
	</div>

	{#if evolutionMonsters.length}
		<h3 class="font-medium border-b border-gray-200 pb-2 mb-2">Evolution Chain</h3>
		<div class="grid grid-cols-3 gap-2 mb-4">
			{#each evolutionMonsters as { id, name, image }}
				<MonsterCard {id} {name} {image} />
			{/each}
		</div>
	{:else}
		<button
			on:click={getEvolutionChain}
			disabled={loadingEvolutionChain}
			type="button"
			class="py-2.5 px-5 mr-2 text-sm font-medium w-full text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center justify-center mb-4"
		>
			{#if loadingEvolutionChain}
				<svg
					aria-hidden="true"
					role="status"
					class="inline w-4 h-4 mr-2 text-gray-200 animate-spin"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="#1C64F2"
					/>
				</svg>
			{/if}
			{#if loadingEvolutionChain}
				Loading Evolution Chain
			{:else}
				View Evolution Chain
			{/if}
		</button>
	{/if}

	{#if data.species.varieties.length > 1}
		{#if allMonsters.length && showVarieties}
			<h3 class="font-medium border-b border-gray-200 pb-2 mb-2">All Variants</h3>
			<div class="grid grid-cols-3 gap-2 mb-4">
				{#each data.species.varieties as variety}
					<MonsterCard
						id={convertUrlToId(variety.pokemon.url)}
						image={allMonsters.filter(
							(monster) => monster.id === convertUrlToId(variety.pokemon.url)
						)[0].image}
						name={allMonsters.filter(
							(monster) => monster.id === convertUrlToId(variety.pokemon.url)
						)[0].name}
					/>
				{/each}
			</div>
		{:else}
			<button
				on:click={getVarieties}
				disabled={loadingVariants}
				type="button"
				class="py-2.5 px-5 mr-2 text-sm font-medium w-full text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center justify-center mb-4"
			>
				{#if loadingVariants}
					<svg
						aria-hidden="true"
						role="status"
						class="inline w-4 h-4 mr-2 text-gray-200 animate-spin"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="#1C64F2"
						/>
					</svg>
				{/if}
				{#if loadingVariants}
					Loading Variants
				{:else}
					View All Variants
				{/if}
				<span
					class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-medium text-white bg-red-500 rounded-full"
				>
					{data.species.varieties.length}
				</span>
			</button>
		{/if}
	{/if}
</div>
