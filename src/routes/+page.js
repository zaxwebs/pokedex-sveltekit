import { getImageUrl, formatName, convertUrlToId } from "../helpers/base";

export const load = async ({ fetch, params }) => {

	const response = await fetch('/api/pokemon');
	const json = await response.json();

	return { monsters: json };

};