<script>
	export let id;
	export let image;
	export let name;
</script>

<article>
	<a data-sveltekit-preload-data="tap" href="/{id}">
		<div class="flex flex-col items-center ">
			<img
				style="max-width: 96px;"
				class="aspect-square w-full"
				loading="lazy"
				src={image}
				alt={name}
			/>
			<h3 class="font-medium">{name}</h3>
		</div>
	</a>
</article>
