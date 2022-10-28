// let body = document.getElementById("body")
// let main = document.getElementById("main")
let pushedArray = []
let pokemonNames = []
let fetchedData = []
let fetchAPI = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	pushArray(data)
	return data
}
//making this fucntion instead of pushing where it is called after the await/async function allowed it to work. no idea why
let pushArray = (data) => {
	pushedArray.push(data)
}

let pushPokemonNames = () => {
	for (pokemon of pushedArray.length)
		pokemonNames.push(pushedArray[0].results[0].name)
}
fetchAPI("https://pokeapi.co/api/v2/pokemon")
//this is a good stopping point, why does the below line have the jumbled data instead of anmes?
console.log("pokemonNames", pokemonNames)
// console.log(fetchedData)
// console.log("pushedArray", pushedArray.results)
