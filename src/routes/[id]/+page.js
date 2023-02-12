import { getImageUrl, formatName } from "../../helpers/base";

export const load = async ({ fetch, params }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
	const json = await response.json();

	console.log(json)

	const monster = {
		...json,
		name: formatName(json.name),
		image: getImageUrl(json.id)
	}

	return { monster };
};