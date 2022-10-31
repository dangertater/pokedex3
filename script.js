// let body = document.getElementById("body")
let main = document.getElementById("main")
let pushedArray = []
let pokemonNames = []
let fetchedData = []
let numbers = []
let accordianItem = `<div class="accordion-item">
<h2 class="accordion-header" id="accordian">
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	Accordion Item #1
  </button>
</h2>
<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
  <div class="accordion-body">
	<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
  </div>
</div>
</div>`

//todo avoid recursive loop bugs by removing pushPokemonNames() until all data is fetched
let fetchAPI = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	pushArray(data)
	await pushPokemonNames(data)
	let nextURL = data.next
	await fetchAPI(nextURL)
	await capitalizePokemonNames()
	console.log("fetchAPIs pushedArray", pushedArray[0].results[0].name)
}

let pushArray = (data) => {
	//making this fucntion instead of pushing where it is called after the await/async
	//----function allowed it to work. no idea why
	return pushedArray.push(data)
}
//will add numbers starting with one to numberWords array based on how many pokemon have been fetched
let numberArrayGenerator = () => {
	for (let i = 0; i < pokemonNames.length; i++) {
		numbers += numbers + i
	}
}
//will generate HTML and modify html main to include a new accordian each time a pokemon is fetched
let accordianGenerator = () => {
	main = main + accordianItem
}
//q4e i converted pushPokemonNames to a for loop instead of a for of loop (both functions below)
//----in what manner am I misusing the for of? results undefined when given [pokemon]
//TODO good practice to convert this function to eitehr forEach, or map, or for of loop etc
let capitalizePokemonNames = async () => {
	for (let i = 0; i < pokemonNames.length; i++) {
		let indyPokemonName = pokemonNames[i]
		let firstLetter = indyPokemonName[0].toUpperCase()
		let restOfLetters = indyPokemonName.slice(1)
		let cappedName = firstLetter + restOfLetters
		pokemonNames[i] = cappedName
	}
	console.log("capitalizePokemonNames()", pokemonNames)
}

let pushPokemonNames = async (data) => {
	for (let singlePokemon of data.results) {
		pokemonNames.push(singlePokemon.name)
	}
	console.log("pushPokemonNames()", pokemonNames)
}
// let pushPokemonNames = async () => {
// 	for (i = 0; i < pushedArray[0].results.length; i++) {
// 		for (pokemon of )
// 		pokemonNames.push(pushedArray[].results[i].name)
// 	}

// 	console.log("pushPokemonNames()", pokemonNames)
// }

// let pushPokemonNames = () => {
// 	for (pokemon of pushedArray[0].results) {
// 		pokemonNames.push(pushedArray[0].results[pokemon].name)
// 	}
// 	console.log(pokemonNames)
// }
fetchAPI("https://pokeapi.co/api/v2/pokemon")
	//
	.then(console.log(pushedArray))
	//because .then expects a function, implementing a callback function allows it to utilize the function at the
	//----appropropraite time, vs the above line
	//----which will just call the console.log immediately which gives the .then nothing to work with (expecting a function)
	.then(() => {
		console.log("promise is done")
	})
//this is a good stopping point, why does the below line have the jumbled data instead of names?
// console.log("pokemonNames", pokemonNames)
// console.log(fetchedData)
// console.log("pushedArray", pushedArray.results)

//single pokemon from data 'pushedArray[0].results[0].name'
