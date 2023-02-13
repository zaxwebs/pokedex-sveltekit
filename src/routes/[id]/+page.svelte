<script>
	export let data;
	import { formatName, gramsToKilos, convertHeight } from '../../helpers/base';

	const calculateStatPerecnt = (stat) => {
		return (stat / 180) * 100;
	};

	const getStatColor = (percent) => {
		if (percent < 25) return 'bg-amber-500';
		if (percent < 50) return 'bg-green-500';
		if (percent < 75) return 'bg-teal-500';
		return 'bg-cyan-500';
	};
</script>

<div>
	<div class="flex flex-col items-center mb-4">
		<img src={data.monster.image} alt={data.monster.name} />
		<h1 class="font-semibold text-4xl mb-4">{data.monster.name}</h1>
		<div class="mb-2">{data.species.genus}</div>
		<div class="flex flex-row gap-4">
			{#each data.monster.types as typeObj}
				<div class="p-1 px-4 border rounded-full">{formatName(typeObj.type.name)}</div>
			{/each}
		</div>
	</div>

	<p class="mb-4">{data.species.flavor_text}</p>

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
			<div>{data.species.habitat.name}</div>
		</div>
		<div class="text-right">
			<h4 class="font-medium">Number</h4>
			<div>{data.monster.id}</div>
		</div>
	</div>

	<div class="max-w-lg">
		<h2 class="font-semibold">Stats</h2>
		{#each data.monster.stats as statObj}
			<div class="flex gap-4 items-center">
				<h3 style="flex: 0.4;">{statObj.stat.name}</h3>
				<div style="flex: 0.2;">{statObj.base_stat}</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 flex-1">
					<div
						class="{getStatColor(calculateStatPerecnt(statObj.base_stat))} h-2.5 rounded-full"
						style="width: {calculateStatPerecnt(statObj.base_stat)}%"
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
