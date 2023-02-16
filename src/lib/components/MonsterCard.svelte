<script>
	export let id;
	export let image;
	export let name;
</script>

<a
	class="flex flex-col items-center hover:bg-blue-50 p-2.5 rounded"
	data-sveltekit-preload-data="tap"
	href="/{id}"
>
	<img
		style="max-width: 96px;"
		class="aspect-square w-full"
		loading="lazy"
		src={image}
		alt={name}
	/>
	<h3 class="font-medium">{name}</h3>
</a>
