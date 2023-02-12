export const getImageUrl = (id) => {
	// return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const formatName = (name) => {
	return name.replace(/\w\S*/g, str => {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	})
}
