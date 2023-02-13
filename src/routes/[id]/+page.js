import { getImageUrl, formatName } from "../../helpers/base";

export const load = async ({ fetch, params }) => {
	const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
	const speciesPromise = fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`);
	

	const [response, speciesResponse] = await Promise.all([pokemonPromise, speciesPromise]);

	const json = await response.json();
	const speciesJson = await speciesResponse.json()


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
			return {...statObj,
				stat: {
					...statObj.stat,
					name: formatStatName(statObj.stat.name)
				}
			}
		})
	}

	const species = {
		...speciesJson,
		genus: speciesJson.genera.filter(function(obj) {
			return obj.language.name === "en";
		  })[0].genus,
		flavor_text: speciesJson.flavor_text_entries.filter(function(obj) {
			return obj.language.name === "en";
		  })[0].flavor_text.replace(/\f/g, ' '),
		habitat: {...speciesJson.habitat, name: formatName(speciesJson.habitat.name)}
	}

	console.log(species)

	return { monster, species };
};