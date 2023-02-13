<script>
	export let data;
	import { formatName, gramsToKilos, convertHeight } from "../../helpers/base";

	const calculateStatPerecnt = (stat) => {
		return stat/180*100
	}

	const getStatColor = percent => {
		if(percent < 25) return 'bg-amber-500'
		if(percent < 50) return 'bg-green-500'
		if(percent < 75) return 'bg-teal-500'
		return 'bg-cyan-500'
	}
</script>

<div>
	<img src={data.monster.image} alt={data.monster.name} />
	<h1 class="font-semibold">{data.monster.name}</h1>
	<div>{data.species.genus}</div>
	<div class="flex flex-row gap-4">
		{#each data.monster.types as typeObj}
			<div>{formatName(typeObj.type.name)}</div>
		{/each}
	</div>
	<p>{data.species.flavor_text}</p>

	<div>
		<h4 class="font-medium">Height</h4>
		<span>{convertHeight(data.monster.height)} m</span>
	</div>
	<div>
		<h4 class="font-medium">Weight</h4>
		<span>{gramsToKilos(data.monster.weight)} kg</span>
	</div>

	<div>
		<h4 class="font-medium">Habitat</h4>
		<div>{data.species.habitat.name}</div>
	</div>

	<div class="max-w-lg">
		<h2 class="font-semibold">Stats</h2>
		{#each data.monster.stats as statObj}
		<div class="flex gap-4">
			<h3 class="font-medium flex-1">{statObj.stat.name}</h3>
			<div class="flex-1 flex flex-row items-center gap-4">
				<div style="flex: 0.2;">{statObj.base_stat}</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 flex-1">
					<div class="{getStatColor(calculateStatPerecnt(statObj.base_stat))} h-2.5 rounded-full" style="width: {calculateStatPerecnt(statObj.base_stat)}%"></div>
				</div>
			</div>
		</div>
		{/each}
	</div>
</div>
