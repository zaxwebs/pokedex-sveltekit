<script>
	import InfiniteScroll from 'svelte-infinite-scroll';
	import FuzzySearch from 'fuzzy-search';
	export let data;

	let page = 0;
	let size = 33;
	let searchTerm = '';

	const searcher = new FuzzySearch(data.monsters, ['name'], {
		caseSensitive: false
	});

	$: allMonsters = [...data.monsters];
	$: searchedMonsters = searcher.search(searchTerm);
	$: displayMonsters = searchTerm ? searchedMonsters : allMonsters;
	$: paginatedMonsters = displayMonsters.slice(0, size * (page + 1));

	console.log(data.monsters);
</script>

<form class="mb-4">
	<label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
		Search Pokémon
	</label>
	<div class="relative">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>
		<input
			bind:value={searchTerm}
			on:change={() => {
				page = 0;
			}}
			type="search"
			id="search"
			class="block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Search Pokémon"
		/>
	</div>
</form>

<div class="grid grid-cols-3 gap-2">
	{#each paginatedMonsters as monster}
		<article>
			<div class="flex flex-col items-center ">
				<img loading="lazy" src={monster.image} alt={monster.name} />
				<a data-sveltekit-preload-data="tap" href="/{monster.id}">
					<h3 class="font-medium">{monster.name}</h3></a
				>
			</div>
		</article>
	{/each}
	<InfiniteScroll threshold={200} window={true} on:loadMore={() => page++} />
</div>
