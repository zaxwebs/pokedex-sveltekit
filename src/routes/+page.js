import { getImageUrl, formatName } from "../helpers/base";

export const load = async ({ fetch, params }) => {
	
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
	const json = await response.json();

	const monsters = json.results.map(monster => {
		const id = monster.url.split('/').slice(-2)[0];
		return {
			id,
			url: monster.url,
			name: formatName(monster.name),
			image: getImageUrl(id)
		}
	})

	return { monsters };

	
};