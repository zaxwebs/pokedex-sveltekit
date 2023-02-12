import { getImageUrl, formatName } from "../../helpers/base";

export const load = async ({ fetch, params }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
	const json = await response.json();

	console.log(json)

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

	return { monster };
};