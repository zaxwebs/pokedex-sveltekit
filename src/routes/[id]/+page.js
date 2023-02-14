import { getImageUrl, formatName } from "../../helpers/base";

export const load = async ({ fetch, params }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
	const json = await response.json();

	const speciesResponse = await fetch(json.species.url);
	const speciesJson = await speciesResponse.json();


	const formatStatName = (name) => {
		const statMap = {
			'hp': 'HP',
			'attack': 'Attack',
			'defense': 'Defense',
			'special-attack': 'Sp. Atk',
			'special-defense': 'Sp. Def',
			'speed': 'Speed',
		};

		return statMap[name] || name;
	};

	const monster = {
		...json,
		name: formatName(json.name),
		image: getImageUrl(json.id),
		stats: [...json.stats].map(statObj => {
			return {
				...statObj,
				stat: {
					...statObj.stat,
					name: formatStatName(statObj.stat.name)
				}
			}
		})
	}

	function setGenus(genera) {
		const filtered = genera.filter(function (obj) {
			return obj.language.name === "en";
		})
		return filtered.length ? filtered[0].genus : null;
	}

	function setFlavorText(entries) {
		if (!entries.length) return null
		const filtered = entries.filter(function (obj) {
			return obj.language.name === "en";
		})
		return filtered.length ? filtered[0].flavor_text.replace(/\f/g, ' ') : null
	}

	const species = {
		...speciesJson,
		genus: setGenus(speciesJson.genera),
		flavor_text: setFlavorText(speciesJson.flavor_text_entries),
		habitat: speciesJson.habitat ? { ...speciesJson.habitat, name: formatName(speciesJson.habitat.name) } : null,
	}

	return { monster, species };
};