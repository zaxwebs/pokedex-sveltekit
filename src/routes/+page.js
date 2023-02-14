import { getImageUrl, formatName, convertUrlToId } from "../helpers/base";

export const load = async ({ fetch, params }) => {

	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999');
	const json = await response.json();

	const monsters = json.results.map(monster => {
		const id = convertUrlToId(monster.url)

		return {
			id,
			url: monster.url,
			name: formatName(monster.name),
			image: getImageUrl(id)
		}
	})

	return { monsters };


};