<script>
	export let data;
</script>

<div>
	<img src={data.monster.image} alt={data.monster.name} />
	<h1 class="font-semibold">{data.monster.name}</h1>
</div>
