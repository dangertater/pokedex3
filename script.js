// let body = document.getElementById("body")
let main = document.getElementById("main")
let pokemonNames = []
let fetchedData = []
let numbers = []
let numbersAsString = []

let accordianItem = `<div class="accordion-item" id=${pokemonNames[0]}>
<h2 class="accordion-header" id="headingOne">
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	PokemonName1
  </button>
</h2>
<div id="collapse${pokemonNames[0]}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
  <div class="accordion-body">
	<strong>Pokemon 1 is a badass
  </div>
</div>
</div>`

//todo avoid recursive loop bugs by removing pushPokemonNames() until all data is fetched
//only fetch if less than 151 pokemon
let fetchAPI = async (url) => {
	if (pokemonNames.length > 150) {
		return null
	}
	const res = await fetch(url)
	const data = await res.json()
	await pushPokemonNames(data)
	let nextURL = data.next
	await fetchAPI(nextURL)
	await numberArrayGenerator()
}

//will add numbers starting with one to numberWords array based on how many pokemon have been fetched
let numberArrayGenerator = async () => {
	for (let i = 0; i < pokemonNames.length; i++) {
		numbers[i] = i
	}
	console.log(numbers)
}
//will generate HTML and modify html main to include a new accordian each time a pokemon is fetched
let accordianGenerator = () => {
	main = main + accordianItem
}

let pushPokemonNames = async (data) => {
	for (let singlePokemon of data.results) {
		pokemonNames.push(_.capitalize(singlePokemon.name))
	}
	console.log("pushPokemonNames()", pokemonNames)
}
fetchAPI("https://pokeapi.co/api/v2/pokemon")

//single pokemon from data 'pushedArray[0].results[0].name'

//q4e i converted pushPokemonNames to a for loop instead of a for of loop (both functions below)
//----in what manner am I misusing the for of? results undefined when given [pokemon]
//TODO good practice to convert this function to eitehr forEach, or map, or for of loop etc
// let capitalizePokemonNames = async () => {
// 	for (let i = 0; i < pokemonNames.length; i++) {
// 		let indyPokemonName = pokemonNames[i]
// 		let firstLetter = indyPokemonName[0].toUpperCase()
// 		let restOfLetters = indyPokemonName.slice(1)
// 		let cappedName = firstLetter + restOfLetters
// 		pokemonNames[i] = cappedName
// 	}
// 	console.log("capitalizePokemonNames()", pokemonNames)
// }
