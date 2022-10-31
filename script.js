// let body = document.getElementById("body")
let main = document.getElementById("main")
let pokemonAccordion = document.getElementById("pokemonAccordion")
let pokemonNames = []
let fetchedData = []
let numbers = []
let numbersAsString = []

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
}

//will generate HTML and modify html main to include a new accordian each time a pokemon is fetched
let accordianItemGenerator = (pokemonName) => {
	let accordianItem = `<div class="accordion-item" id="${pokemonName}">
	<h2 class="accordion-header" id="heading${pokemonName}">
	  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${pokemonName}" aria-expanded="true" aria-controls="collapse${pokemonName}">
	  ${pokemonName}
	  </button>
	</h2>
	<div id="collapse${pokemonName}" class="accordion-collapse collapse" aria-labelledby="heading${pokemonName}" data-bs-parent="#pokemonAccordion">
	  <div class="accordion-body">
		<strong>${pokemonName} is a badass</strong>
	  </div>
	</div>
	</div>`
	pokemonAccordion.innerHTML = pokemonAccordion.innerHTML + accordianItem
}

let pushPokemonNames = async (data) => {
	for (let singlePokemon of data.results) {
		let cappedName = _.capitalize(singlePokemon.name)
		pokemonNames.push(cappedName)
		accordianItemGenerator(cappedName)
	}
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
