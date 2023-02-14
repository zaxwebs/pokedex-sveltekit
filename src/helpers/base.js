export const getImageUrl = (id) => {
	// return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

	// IDs that are missing images
	const noImageIds = [10129, 10146, 10128, 10153, 10160, 10154, 10159, 10158, 10187, 10181, 10183, 10182, 10192, 10270, 10269, 10265, 10264, 10268, 10267, 10271, 10266];

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const formatName = (name) => {
	name = name.replace(/-/g, ' ');
	return name.replace(/\w\S*/g, str => {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	})
}

export const gramsToKilos = grams => {
	return grams / 10;
}

export const convertHeight = height => height / 10

export const fetchInParallel = async (endpoints) => {
	try {
		const responses = await Promise.all(endpoints.map(endpoint => fetch(endpoint)));
		const json = await Promise.all(responses.map(response => response.json()));
		return json
	} catch (error) {
		console.error(error);
	}
}
